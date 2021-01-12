using Azure;
using Azure.Search.Documents.Indexes;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess.Contracts;
using PinaryDevelopment.TorahIsLife.DataAccess.Contracts;
using System;

namespace PinaryDevelopment.TorahIsLife.DataAccess.Migrations
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddDbContext<TorahIsLifeDbContext>(options => SqlServerDbContextOptionsExtensions.UseSqlServer(options, ""));
                    services.AddSingleton(new SearchIndexClient(new Uri(""), new AzureKeyCredential("")));
                    services.AddHostedService<MigrationsHostedService>();
                });
    }
}
