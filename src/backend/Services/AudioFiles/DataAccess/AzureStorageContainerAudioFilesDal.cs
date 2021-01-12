using Microsoft.Azure.Storage.Blob;
using PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess.Contracts;
using System.IO;
using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess
{
    public class AzureStorageContainerAudioFilesDal : IAudioFilesDal
    {
        private CloudBlobClient CloudBlobClient { get; }

        public AzureStorageContainerAudioFilesDal(CloudBlobClient cloudBlobClient)
        {
            CloudBlobClient = cloudBlobClient;
        }

        public Task Create(string organizationId, string fileId, Stream stream)
        {
            return CloudBlobClient.GetContainerReference(organizationId)
                                  .GetBlockBlobReference(fileId)
                                  .UploadFromStreamAsync(stream);
        }

        public async Task<MemoryStream> Read(string organizationId, string fileId)
        {
            var ms = new MemoryStream();
            await CloudBlobClient.GetContainerReference(organizationId)
                                  .GetBlockBlobReference(fileId)
                                  .DownloadToStreamAsync(ms);
            return ms;
        }
    }
}
