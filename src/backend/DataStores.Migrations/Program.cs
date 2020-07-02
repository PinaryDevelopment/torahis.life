using System;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
// using Microsoft.Azure.WebJobs;

namespace Migrations
{
    class Program
    {
        static async Task Main(string[] args)
        {
            await MigrateCosmosDb();
            // await MigrateAzureStorage();
        }

        static async Task MigrateCosmosDb()
        {
            using var cosmosClient = new CosmosClient(Environment.GetEnvironmentVariable("AzureCosmosConnectionString", EnvironmentVariableTarget.Process));

            var dbId = "torahislife";
            var dbResponse = await cosmosClient.CreateDatabaseIfNotExistsAsync(dbId);

            var containerId = "shiurim";
            var partitionKeyPath = "id";
            await dbResponse.Database.CreateContainerIfNotExistsAsync
            (
                new ContainerProperties(containerId, partitionKeyPath),
                ThroughputProperties.CreateManualThroughput(400)
            );
        }

        // static async Task MigrateAzureStorage()
        // {
        //     var cloudBlobClient = StorageAccount.NewFromConnectionString(Environment.GetEnvironmentVariable("AzureWebJobsStorage", EnvironmentVariableTarget.Process))
        //                                         .CreateCloudBlobClient();

        //     await cloudBlobClient.GetContainerReference().CreateIfNotExistsAsync();
        // }
    }
}
