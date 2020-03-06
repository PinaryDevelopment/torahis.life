using Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System;
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

        //[FunctionName("BrombergFullOriginalFileListener")]
        //public static async Task BlobListener([BlobTrigger(StaticData.ShiurimContainerName + "/" + StaticData.UploadedFileRootContainerPath + "/{name}", Connection = "AzureWebJobsStorage")]ICloudBlob blob, string name, ILogger log, ExecutionContext context)
        //{
        //    log.LogInformation($"Executing directory: {context.FunctionAppDirectory}");
        //    log.LogInformation($"Processing Name: {name}, Size: {blob.Properties.Length}b");
        //    var podcastMetadata = RabbiYosefBrombergFull;
        //    var audioFileService = new AudioFileService(blob, context);
        //    await audioFileService.ProcessFile(podcastMetadata).ConfigureAwait(false);

        //    var audioFile = new AudioFileName(blob.Name);
        //    await new GitHubClientWrapper(
        //            Environment.GetEnvironmentVariable("GitHub.Owner", EnvironmentVariableTarget.Process),
        //            Environment.GetEnvironmentVariable("GitHub.RepositoryName", EnvironmentVariableTarget.Process),
        //            Environment.GetEnvironmentVariable("GitHub.PrivateKey", EnvironmentVariableTarget.Process),
        //            Environment.GetEnvironmentVariable("GitHub.AppId", EnvironmentVariableTarget.Process),
        //            Environment.GetEnvironmentVariable("GitHub.AppName", EnvironmentVariableTarget.Process)
        //        ).CreatePostComment(podcastMetadata.Author, audioFile.RecordedOn, audioFile.Masechta, audioFile.Daf, audioFile.Subtitle, audioFileService.Duration).ConfigureAwait(false);

        //    log.LogInformation($"Uploaded Name:{Path.GetFileName(audioFileService.OutgoingBlobReference.Name)}, Size: {audioFileService.OutgoingBlobReference.Properties.Length}b");

        //    if (audioFile.Subtitle.Equals("with Rashi", StringComparison.OrdinalIgnoreCase) && bool.Parse(Environment.GetEnvironmentVariable("ShouldSendEmail", EnvironmentVariableTarget.Process) ?? bool.FalseString))
        //    {
        //        await EmailerService.SendEmails(blob.Container, audioFile, audioFileService.OutgoingBlobReference).ConfigureAwait(false);
        //    }
        //}

        //[FunctionName("ShiurRetriever")]
        //public static async Task<IActionResult> ShiurRetriever([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)]HttpRequest req, ILogger log)
        //{
        //    var name = req.Query["name"];
        //    log.LogInformation($"Requested Name: {name}");

        //    var blockBlob = StorageAccount.NewFromConnectionString(Environment.GetEnvironmentVariable("AzureWebJobsStorage", EnvironmentVariableTarget.Process))
        //                                  .CreateCloudBlobClient()
        //                                  .GetContainerReference(StaticData.ShiurimContainerName)
        //                                  .GetBlockBlobReference(name);
        //    using var ms = new MemoryStream();
        //    await blockBlob.DownloadToStreamAsync(ms).ConfigureAwait(false);
        //    return new FileContentResult(ms.ToArray(), "audio/mpeg") { FileDownloadName = Path.GetFileName(blockBlob.Name), EnableRangeProcessing = true };
        //}

        //[FunctionName("EightMinuteDafConverter")]
        //public static async Task Run([TimerTrigger("0 0 10 * * *")]TimerInfo myTimer, ILogger log, ExecutionContext context)
        //{
        //    log.LogInformation($"Timer executed at: {DateTime.Now}. To process today's eight minute daf.");

        //    await VideoFileService.ProcessFile(context).ConfigureAwait(false);

        //    log.LogInformation($"Eight minute daf processed {DateTime.Now}.");
        //}

        [FunctionName("ShiurInfo")]
        public static async Task<IActionResult> ShiurInfo([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)]HttpRequest req, ILogger log)
        {
            var tags = req.Query["tags"].Select(tag => tag.Replace("-", " "));

            var serializedData = await StorageAccount.NewFromConnectionString(Environment.GetEnvironmentVariable("AzureWebJobsStorage", EnvironmentVariableTarget.Process))
                                                     .CreateCloudBlobClient()
                                                     .GetContainerReference(StaticData.ShiurimContainerName)
                                                     .GetBlockBlobReference("data.json")
                                                     .DownloadTextAsync()
                                                     .ConfigureAwait(false);
            var data = JsonSerializer.Deserialize<V2Data>(serializedData);
            var relevantTags = data.tags.Select((Tag, Index) => (Tag, Index)).Where(t => tags.Contains(t.Tag.tag, StringComparer.OrdinalIgnoreCase));
            var tagIds = relevantTags.Select(t => t.Index);
            var shiurim = data.shiurim.Where(s => s.tags.Any(t => tagIds.Contains(t)));
            var origin = req.Headers["Origin"];
            if (origin == "http://localhost:9000" || origin == "https://torahis.life")
            {
                req.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", origin);
            }

            return await Task.FromResult(new JsonResult(new V2Data { shiurim = shiurim.ToArray(), tags = data.tags }));
        }
    }

    public enum V2TagType
    {
        Unknown = 0,
        Author = 1,
        Series = 2
    }

    public class V2Tag
    {
        //[JsonPropertyName("0")]
        public string tag { get; set; }
        //[JsonPropertyName("1")]
        public V2TagType type { get; set; }
    }

    public class V2Data
    {
        //[JsonPropertyName("0")]
        public V2Tag[] tags { get; set; }
        //[JsonPropertyName("1")]
        public V2Shiur[] shiurim { get; set; }
    }

    public class V2Shiur
    {
        //[JsonPropertyName("0")]
        public string title { get; set; }
        //[JsonPropertyName("1")]
        public int[] tags { get; set; }
        //[JsonPropertyName("2")]
        public string date { get; set; }
        //[JsonPropertyName("3")]
        public string duration { get; set; }
    }
}
