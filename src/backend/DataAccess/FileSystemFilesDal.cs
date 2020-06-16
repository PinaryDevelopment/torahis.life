using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using PinaryDevelopment.DataAccess.Contracts;
using System;

namespace PinaryDevelopment.DataAccess
{
    public class FileSystemFilesDal : IFilesDal
    {
        private string FilesStorageBasePath = Environment.GetEnvironmentVariable("LocalFilesStoragePath", EnvironmentVariableTarget.Process);

        public async Task<string> Create(ShiurDto dto, Stream fileStream)
        {
            using (var file = File.Create($"{FilesStorageBasePath}/{dto.StorageId}"))
            {
                await fileStream.CopyToAsync(file).ConfigureAwait(false);
            }

            using (var file = File.Create($"{FilesStorageBasePath}/{dto.StorageId}.json"))
            {
                file.Write(JsonSerializer.SerializeToUtf8Bytes(dto));
            }

            return dto.Id;
        }
    }
}