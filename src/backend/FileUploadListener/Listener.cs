using Data;
using FileUploadListener.GitHub;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.IO;
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

        [FunctionName("BrombergFullOriginalFileListener")]
        public static async Task BlobListener([BlobTrigger(StaticData.ShiurimContainerName + "/" + StaticData.UploadedFileRootContainerPath + "/{name}", Connection = "AzureWebJobsStorage")]ICloudBlob blob, string name, ILogger log, ExecutionContext context)
        {
            log.LogInformation($"Executing directory: {context.FunctionAppDirectory}");
            log.LogInformation($"Processing Name: {name}, Size: {blob.Properties.Length}b");
            var podcastMetadata = RabbiYosefBrombergFull;
            var audioFileService = new AudioFileService(blob, context);
            await audioFileService.ProcessFile(podcastMetadata).ConfigureAwait(false);

            var audioFile = new AudioFileName(blob.Name);
            await new GitHubClientWrapper(
                    Environment.GetEnvironmentVariable("GitHub.Owner", EnvironmentVariableTarget.Process),
                    Environment.GetEnvironmentVariable("GitHub.RepositoryName", EnvironmentVariableTarget.Process),
                    Environment.GetEnvironmentVariable("GitHub.PrivateKey", EnvironmentVariableTarget.Process),
                    Environment.GetEnvironmentVariable("GitHub.AppId", EnvironmentVariableTarget.Process),
                    Environment.GetEnvironmentVariable("GitHub.AppName", EnvironmentVariableTarget.Process)
                ).CreatePostComment(podcastMetadata.Author, audioFile.RecordedOn, audioFile.Masechta, audioFile.Daf, audioFile.Subtitle, audioFileService.Duration).ConfigureAwait(false);

            log.LogInformation($"Uploaded Name:{Path.GetFileName(audioFileService.OutgoingBlobReference.Name)}, Size: {audioFileService.OutgoingBlobReference.Properties.Length}b");

            if (audioFile.Subtitle.Equals("with Rashi", StringComparison.OrdinalIgnoreCase) && bool.Parse(Environment.GetEnvironmentVariable("ShouldSendEmail", EnvironmentVariableTarget.Process) ?? bool.FalseString))
            {
                await EmailerService.SendEmails(blob.Container, audioFile, audioFileService.OutgoingBlobReference).ConfigureAwait(false);
            }
        }

        [FunctionName("ShiurRetriever")]
        public static async Task<IActionResult> ShiurRetriever([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)]HttpRequest req, ILogger log)
        {
            var name = req.Query["name"];
            log.LogInformation($"Requested Name: {name}");

            var blockBlob = StorageAccount.NewFromConnectionString(Environment.GetEnvironmentVariable("AzureWebJobsStorage", EnvironmentVariableTarget.Process))
                                          .CreateCloudBlobClient()
                                          .GetContainerReference(StaticData.ShiurimContainerName)
                                          .GetBlockBlobReference(name);
            using var ms = new MemoryStream();
            await blockBlob.DownloadToStreamAsync(ms).ConfigureAwait(false);
            return new FileContentResult(ms.ToArray(), "audio/mpeg") { FileDownloadName = Path.GetFileName(blockBlob.Name), EnableRangeProcessing = true };
        }

        [FunctionName("EightMinuteDafConverter")]
        public static async Task Run([TimerTrigger("0 0 10 * * *")]TimerInfo myTimer, ILogger log, ExecutionContext context)
        {
            log.LogInformation($"Timer executed at: {DateTime.Now}. To process today's eight minute daf.");

            await VideoFileService.ProcessFile(context).ConfigureAwait(false);

            log.LogInformation($"Eight minute daf processed {DateTime.Now}.");
        }
    }
}
