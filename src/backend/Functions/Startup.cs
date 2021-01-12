using Azure;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.Blob;
using Microsoft.Azure.Storage.Queue;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PinaryDevelopment.TorahIsLife.DataAccess;
using PinaryDevelopment.TorahIsLife.Functions.ServiceCollectionExtensions;

[assembly: FunctionsStartup(typeof(PinaryDevelopment.TorahIsLife.Functions.Startup))]

namespace PinaryDevelopment.TorahIsLife.Functions
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            //var configBuilder = new ConfigurationBuilder();
            //configBuilder.AddEnvironmentVariables();

            //if (Environment.GetEnvironmentVariable("AZURE_FUNCTIONS_ENVIRONMENT") == "Development")
            //{
            //    configBuilder.AddJsonFile("/root/.microsoft/usersecrets/56808127-6a08-4176-bc3a-b713d6660289/secrets.json");
            //}
            //else
            //{
            //    configBuilder.AddAzureKeyVault(
            //        $"https://{Environment.GetEnvironmentVariable("KeyVaultName")}.vault.azure.net/",
            //        Environment.GetEnvironmentVariable("KeyVaultClientId"),
            //        Environment.GetEnvironmentVariable("KeyVaultClientSecret")
            //    );
            //}

            //builder.Services.AddSingleton<IConfiguration>(configBuilder.Build());

            string connectionString = "";
            builder.Services.AddDbContext<TorahIsLifeDbContext>(options => SqlServerDbContextOptionsExtensions.UseSqlServer(options, connectionString));

            builder.Services.AddSingleton(CloudStorageAccount.Parse(""));
            builder.Services.AddSingleton(serviceProvider =>
            {
                var cloudStorageAccount = serviceProvider.GetService<CloudStorageAccount>();
                return cloudStorageAccount.CreateCloudQueueClient();
            });
            builder.Services.AddSingleton(serviceProvider =>
            {
                var cloudStorageAccount = serviceProvider.GetService<CloudStorageAccount>();
                return cloudStorageAccount.CreateCloudBlobClient();
            });

            string queryApiKey = "";
            builder.Services.AddSingleton(new AzureKeyCredential(queryApiKey));

            builder.Services.RegisterAudioFileServices()
                            .RegisterOrganizationsServices()
                            .RegisterPeopleServices()
                            .RegisterTagsServices();
        }
    }
}
