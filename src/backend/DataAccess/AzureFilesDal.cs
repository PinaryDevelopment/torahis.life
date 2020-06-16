using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.Storage.Blob;
using PinaryDevelopment.DataAccess.Contracts;

namespace PinaryDevelopment.DataAccess
{
    public class AzureFilesDal : IFilesDal
    {
        private CloudBlobClient CloudBlobClient { get; }
        private CosmosClient CosmosClient { get; }
        
        public AzureFilesDal()
        {
            CloudBlobClient = StorageAccount.NewFromConnectionString(Environment.GetEnvironmentVariable("AzureWebJobsStorage", EnvironmentVariableTarget.Process))
                                            .CreateCloudBlobClient();
           
            CosmosClient = new CosmosClient(Environment.GetEnvironmentVariable("AzureCosmosConnectionString", EnvironmentVariableTarget.Process), new CosmosClientOptions { SerializerOptions = new CosmosSerializationOptions { PropertyNamingPolicy = CosmosPropertyNamingPolicy.CamelCase }});
        }

        public async Task<string> Create(ShiurDto dto, Stream fileStream)
        {
            var createTask = Create(dto);
            await Task.WhenAll(
                Upload(dto.OrganizationId, dto.StorageId, fileStream),
                createTask
            ).ConfigureAwait(false);
            return createTask.Result;
        }

        private async Task<string> Create(ShiurDto dto)
        {
            /* TODO:
             1   Create organization api endpoint
                 1a organization create(POST) should create Blob Container(OrganizationId)
             2   Create azure resources setup script/program
                 2a create messaging queue in storage account for file uploaded messages
             3   Add queue message listener to FilesApi for file uploaded messages
                 2b create torahislife db in Cosmos db
                 2c create shiurim container in torahislife db
             */
            // https://docs.microsoft.com/en-us/azure/cosmos-db/create-sql-api-dotnet-v4
            var container = CosmosClient.GetContainer("torahislife", "shiurim");
            System.Console.WriteLine(JsonSerializer.Serialize(dto));
            var response = await container.UpsertItemAsync<ShiurDto>(dto, new PartitionKey(dto.Id)).ConfigureAwait(false);
            return response.Resource.Id;
        }

        private Task Upload(string organizationId, Guid storageId, Stream fileStream)
        {
            return CloudBlobClient.GetContainerReference(organizationId)
                                  .GetBlockBlobReference(storageId.ToString())
                                  .UploadFromStreamAsync(fileStream);
        }
    }
}