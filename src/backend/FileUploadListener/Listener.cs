using Data;
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
        public static async Task BlobListener([BlobTrigger(StaticData.ShiurimContainerName + "/" + StaticData.UploadedFileRootContainerPath + "/{name}", Connection = "")]ICloudBlob blob, string name, ILogger log, ExecutionContext context)
        {
            log.LogInformation($"Executing directory: {context.FunctionAppDirectory}");
            log.LogInformation($"Processing Name: {name}, Size: {blob.Properties.Length}b");
            var podcastMetadata = RabbiYosefBrombergFull;

            var audioFileService = new AudioFileService(blob, context);
            await audioFileService.ProcessFile(podcastMetadata).ConfigureAwait(false);
            log.LogInformation($"Uploaded Name:{Path.GetFileName(audioFileService.OutgoingBlobReference.Name)}, Size: {audioFileService.OutgoingBlobReference.Properties.Length}b");
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
            return new FileContentResult(ms.ToArray(), "audio/mpeg") { FileDownloadName = Path.GetFileName(blockBlob.Name) };
        }
    }
}
