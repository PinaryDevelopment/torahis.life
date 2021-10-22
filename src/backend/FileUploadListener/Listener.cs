using Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace FileUploadListener
{
    public static class Listener
    {
        private static readonly PodcastMetadata RabbiYosefBrombergFull = new PodcastMetadata
        {
            Author = "Rabbi Yosef Bromberg",
            Title = "Daf Yomi with Rabbi Yosef Bromberg - Full",
            Description = "A daf yomi shiur given by Rabbi Yosef Bromberg. This version includes the daf with Rashi.",
            RootUrl = "https://www.torahis.life/daf-yomi/rabbi-yosef-bromberg/full"
        };

        private static readonly Dictionary<string, string> MimeTypeLookupByFileExtension = new Dictionary<string, string>
        {
            { ".mp3", "audio/mpeg" }
        };

        [FunctionName("BrombergFullOriginalFileListener")]
        public static async Task BlobListener([BlobTrigger(StaticData.ShiurimContainerName + "/" + StaticData.UploadedFileRootContainerPath + "/{name}", Connection = "AzureWebJobsStorage")]ICloudBlob blob, string name, ILogger log, ExecutionContext context)
        {
            log.LogInformation($"Executing directory: {context.FunctionAppDirectory}");
            log.LogInformation($"Processing Name: {name}, Size: {blob.Properties.Length}b");
            var podcastMetadata = RabbiYosefBrombergFull;
            var audioFileService = new AudioFileService(blob, context);
            await audioFileService.ProcessFile(podcastMetadata).ConfigureAwait(false);

            var audioFile = new AudioFileName(blob.Name);
            //await new GitHubClientWrapper(
            //        Environment.GetEnvironmentVariable("GitHub.Owner", EnvironmentVariableTarget.Process),
            //        Environment.GetEnvironmentVariable("GitHub.RepositoryName", EnvironmentVariableTarget.Process),
            //        Environment.GetEnvironmentVariable("GitHub.PrivateKey", EnvironmentVariableTarget.Process),
            //        Environment.GetEnvironmentVariable("GitHub.AppId", EnvironmentVariableTarget.Process),
            //        Environment.GetEnvironmentVariable("GitHub.AppName", EnvironmentVariableTarget.Process)
            //    ).CreatePostComment(podcastMetadata.Author, audioFile.RecordedOn, audioFile.Masechta, audioFile.Daf, audioFile.Subtitle, audioFileService.Duration).ConfigureAwait(false);

            log.LogInformation($"Uploaded Name:{Path.GetFileName(audioFileService.OutgoingBlobReference.Name)}, Size: {audioFileService.OutgoingBlobReference.Properties.Length}b");

            await UpdateDataStore(audioFile, audioFileService.Duration).ConfigureAwait(false);

            if (audioFile.Subtitle.Equals("with Rashi", StringComparison.OrdinalIgnoreCase) && bool.Parse(Environment.GetEnvironmentVariable("ShouldSendEmail", EnvironmentVariableTarget.Process) ?? bool.FalseString))
            {
                await EmailerService.SendEmails(blob.Container, audioFile, audioFileService.OutgoingBlobReference).ConfigureAwait(false);
            }
        }

        [FunctionName("ShiurRetriever")]
        public static async Task<IActionResult> ShiurRetriever([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)]HttpRequest req, ILogger log)
        {
            if (req.Headers["Origin"] == Environment.GetEnvironmentVariable("CORSUrl", EnvironmentVariableTarget.Process))
            {
                req.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", req.Headers["Origin"]);
            }

            var id = int.Parse(req.Query["id"]);
            log.LogInformation($"Requested Id: {id}");

            var data = await GetData().ConfigureAwait(false);
            var shiur = data.shiurim.First(s => s.id == id);
            var tags = data.tags.Where(t => shiur.tags.Contains(t.id)).ToArray();
            var author = data.authors.First(a => a.id == shiur.authorId);
            var fileName = $"dist/{author.name.ToLower().Replace(" ", string.Empty)}/{tags.First(t => t.type == V2TagType.SeriesLevel1).tag.ToLower().Replace(" ", string.Empty)}/{tags.First(t => t.type == V2TagType.SeriesLevel2).tag.ToLower()/{shiur.title} - {tags.First(t => t.type == V2TagType.SeriesLevel3).tag} ({DateTime.ParseExact(shiur.date, "s", null):MMM d yyyy}).mp3";
            var fileContents = await GetFile(fileName).ConfigureAwait(false);
            
            return new FileContentResult(fileContents, MimeTypeLookupByFileExtension[Path.GetExtension(fileName)]) { FileDownloadName = Path.GetFileName(fileName), EnableRangeProcessing = true };
        }

        [FunctionName("ShiurInfo")]
        public static async Task<IActionResult> ShiurInfo([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)]HttpRequest req, ILogger log)
        {
            var data = await GetData().ConfigureAwait(false);

            log.LogInformation(req.Headers["Origin"]);
            log.LogInformation(Environment.GetEnvironmentVariable("CORSUrl", EnvironmentVariableTarget.Process));
            if (req.Headers["Origin"] == Environment.GetEnvironmentVariable("CORSUrl", EnvironmentVariableTarget.Process))
            {
                req.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", req.Headers["Origin"]);
            }

            if (req.Query.ContainsKey("id"))
            {
                var id = int.Parse(req.Query["id"]);
                return new JsonResult(new V2Data { shiurim = new[] { data.shiurim.First(s => s.id == id) }, tags = data.tags, authors = data.authors });
            }
            else
            {
                var tags = string.IsNullOrWhiteSpace(req.Query["tags"]) ? Enumerable.Empty<string>() : req.Query["tags"].Select(tag => tag.Replace("-", " "));
                var authors = string.IsNullOrWhiteSpace(req.Query["authors"]) ? Enumerable.Empty<string>() : req.Query["authors"].Select(tag => tag.Replace("-", " "));
                var titles = string.IsNullOrWhiteSpace(req.Query["titles"]) ? Enumerable.Empty<string>() : req.Query["titles"].Select(tag => tag.Replace("-", " "));

                var tagIds = data.tags
                                 .Where(t => tags.Contains(t.tag, StringComparer.OrdinalIgnoreCase))
                                 .Select(t => t.id);
                var shiurim = data.shiurim.Where(s => tagIds.All(id => s.tags.Contains(id)));

                return new JsonResult(new V2Data { shiurim = shiurim.ToArray(), tags = data.tags, authors = data.authors });
            }
        }

        [FunctionName("RefreshCache")]
        public static async Task<IActionResult> RefreshCache([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)]HttpRequest req, ILogger log)
        {
            var cachedFilePath = Path.Combine(Path.GetTempPath(), "data.json");
            var serializedData = await StorageAccount.NewFromConnectionString(Environment.GetEnvironmentVariable("AzureWebJobsStorage", EnvironmentVariableTarget.Process))
                                                     .CreateCloudBlobClient()
                                                     .GetContainerReference(StaticData.ShiurimContainerName)
                                                     .GetBlockBlobReference("data.json")
                                                     .DownloadTextAsync()
                                                     .ConfigureAwait(false);
            File.WriteAllText(cachedFilePath, serializedData);
            return new OkResult();
        }

        private static async Task<V2Data> GetData()
        {
            var cachedFilePath = Path.Combine(Path.GetTempPath(), "data.json");
            string serializedData;
            if (File.Exists(cachedFilePath))
            {
                serializedData = File.ReadAllText(cachedFilePath);
            }
            else
            {
                serializedData = await StorageAccount.NewFromConnectionString(Environment.GetEnvironmentVariable("AzureWebJobsStorage", EnvironmentVariableTarget.Process))
                                                     .CreateCloudBlobClient()
                                                     .GetContainerReference(StaticData.ShiurimContainerName)
                                                     .GetBlockBlobReference("data.json")
                                                     .DownloadTextAsync()
                                                     .ConfigureAwait(false);
                File.WriteAllText(cachedFilePath, serializedData);
            }

            return JsonSerializer.Deserialize<V2Data>(serializedData);
        }

        private static async Task<byte[]> GetFile(string fileName)
        {
            fileName = fileName.Replace("/", "\\");
            var topLevelDirectory = Path.Combine(Path.GetTempPath(), "shiurim");
            var cachedFilePath = Path.Combine(topLevelDirectory, fileName);

            var fileDirectory = Path.GetDirectoryName(cachedFilePath);
            if (!Directory.Exists(fileDirectory))
            {
                Directory.CreateDirectory(fileDirectory);
            }

            foreach (var filePath in Directory.GetFiles(topLevelDirectory, "*", SearchOption.AllDirectories).Where(filePath => filePath != fileName))
            {
                // only keep files cached for 7 days
                if (File.GetLastWriteTime(filePath) < DateTime.Now.AddDays(-7))
                {
                    File.Delete(filePath);
                }
            }

            if (!File.Exists(cachedFilePath))
            {
                await StorageAccount.NewFromConnectionString(Environment.GetEnvironmentVariable("AzureWebJobsStorage", EnvironmentVariableTarget.Process))
                                    .CreateCloudBlobClient()
                                    .GetContainerReference(StaticData.ShiurimContainerName)
                                    .GetBlockBlobReference(fileName)
                                    .DownloadToFileAsync(cachedFilePath, FileMode.Create)
                                    .ConfigureAwait(false);
            }

            using var fileStream = File.OpenRead(cachedFilePath);
            byte[] fileBytes = new byte[fileStream.Length];
            fileStream.Read(fileBytes, 0, fileBytes.Length);
            
            return fileBytes;
        }

        private static async Task UpdateDataStore(AudioFileName audioFile, TimeSpan duration)
        {
            var data = await GetData().ConfigureAwait(false);

            var tagStrings = new[] { "Daf Yomi", audioFile.Masechta.ToUppercaseWords(), audioFile.Subtitle };

            var unknownTags = tagStrings.Where(ts => data.tags.All(t => t.tag != ts));
            if (unknownTags.Any())
            {
                var currentIdMax = data.tags.Max(t => t.id);
                foreach (var unknownTag in unknownTags)
                {
                    data.tags.Append(new V2Tag
                    {
                        id = ++currentIdMax,
                        tag = unknownTag,
                        type = V2TagType.SeriesLevel2
                    });
                }
            }

            var shiur = new V2Shiur
            {
                date = audioFile.RecordedOn.ToString("s"),
                title = $"Daf {audioFile.Daf}",
                id = (data.shiurim.Any() ? data.shiurim.Max(s => s.id) : 0) + 1,
                tags = tagStrings.Select(str => data.tags.First(t => t.tag == str).id).ToArray(),
                duration = duration > TimeSpan.FromHours(1) ? duration.ToString("hh':'mm':'ss") : duration.ToString("mm':'ss"),
                authorId = data.authors.First(a => a.name.Equals(RabbiYosefBrombergFull.Author, StringComparison.OrdinalIgnoreCase)).id
            };

            var (previousMasechta, previousDaf) = StaticData.CalculateDafForDate(audioFile.RecordedOn.AddDays(-1));
            var previousShiurim = data.shiurim.Where(s => s.title == $"Daf {previousDaf}" && s.tags.Contains(data.tags.First(t => t.tag.Equals(previousMasechta, StringComparison.OrdinalIgnoreCase)).id));
            foreach (var previousShiur in previousShiurim)
            {
                if (previousShiur.tags.All(tag => shiur.tags.Contains(tag)) || previousShiur.nextId == null)
                {
                    previousShiur.nextId = shiur.id;
                }
            }

            shiur.previousId = previousShiurim.Count() == 1 ? previousShiurim.First().id : previousShiurim.FirstOrDefault(ps => ps.tags.All(tag => shiur.tags.Contains(tag)))?.id;

            data.shiurim = data.shiurim.Concat(new[] { shiur }).ToArray();

            var cachedFilePath = Path.Combine(Path.GetTempPath(), "data.json");
            var serializedData = JsonSerializer.Serialize(data);
            await StorageAccount.NewFromConnectionString(Environment.GetEnvironmentVariable("AzureWebJobsStorage", EnvironmentVariableTarget.Process))
                                .CreateCloudBlobClient()
                                .GetContainerReference(StaticData.ShiurimContainerName)
                                .GetBlockBlobReference("data.json")
                                .UploadTextAsync(serializedData)
                                .ConfigureAwait(false);

            File.WriteAllText(cachedFilePath, serializedData);
        }
    }

    public enum V2TagType
    {
        Unknown = 0,
        SeriesLevel1 = 1,
        SeriesLevel2 = 2,
        SeriesLevel3 = 3
    }

    public class V2Tag
    {
        public int id { get; set; }
        //[JsonPropertyName("0")]
        public string tag { get; set; }
        //[JsonPropertyName("1")]
        public V2TagType type { get; set; }
    }

    public class V2Author
    {
        public int id { get; set; }
        public string name { get; set; }
    }

    public class V2Data
    {
        //[JsonPropertyName("0")]
        public V2Tag[] tags { get; set; }
        //[JsonPropertyName("1")]
        public V2Shiur[] shiurim { get; set; }
        public V2Author[] authors { get; set; }
    }

    public class V2Shiur
    {
        public int id { get; set; }
        //[JsonPropertyName("0")]
        public string title { get; set; }
        //[JsonPropertyName("1")]
        public int[] tags { get; set; }
        //[JsonPropertyName("2")]
        public string date { get; set; }
        //[JsonPropertyName("3")]
        public string duration { get; set; }
        public int? previousId { get; set; }
        public int? nextId { get; set; }
        public int authorId { get; set; }
    }
}
