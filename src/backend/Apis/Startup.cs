using System;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(PinaryDevelopment.Apis.Startup))]
namespace PinaryDevelopment.Apis
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var configBuilder = new ConfigurationBuilder();
            configBuilder.AddEnvironmentVariables();

            if (Environment.GetEnvironmentVariable("AZURE_FUNCTIONS_ENVIRONMENT") == "Development")
            {
                configBuilder.AddJsonFile("/root/.microsoft/usersecrets/56808127-6a08-4176-bc3a-b713d6660289/secrets.json");
            }
            else
            {
                configBuilder.AddAzureKeyVault(
                    $"https://{Environment.GetEnvironmentVariable("KeyVaultName")}.vault.azure.net/",
                    Environment.GetEnvironmentVariable("KeyVaultClientId"),
                    Environment.GetEnvironmentVariable("KeyVaultClientSecret")
                );
            }

            builder.Services.AddSingleton<IConfiguration>(configBuilder.Build());
        }
    }
}