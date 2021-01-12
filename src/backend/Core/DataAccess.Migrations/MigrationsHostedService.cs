using Azure.Search.Documents.Indexes;
using Azure.Search.Documents.Indexes.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess.Contracts;
using System.Threading;
using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.DataAccess.Migrations
{
    public class MigrationsHostedService : IHostedService
    {
        private TorahIsLifeDbContext TorahIsLifeDbContext { get; }
        private SearchIndexClient SearchIndexClient { get; }
        private IHostApplicationLifetime HostApplicationLifetime { get; }

        public MigrationsHostedService(IHostApplicationLifetime appLifetime, TorahIsLifeDbContext context, SearchIndexClient searchIndexClient)
        {
            TorahIsLifeDbContext = context;
            SearchIndexClient = searchIndexClient;
            HostApplicationLifetime = appLifetime;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            MigrateDatabase();
            MigrateSearchIndex();

            HostApplicationLifetime.StopApplication();
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        private void MigrateDatabase()
        {
            TorahIsLifeDbContext.Database.Migrate();
        }

        private void MigrateSearchIndex()
        {
            FieldBuilder fieldBuilder = new FieldBuilder();
            var searchFields = fieldBuilder.Build(typeof(AudioFileSearchDto));
            var definition = new SearchIndex("audio-files", searchFields);

            SearchIndexClient.CreateOrUpdateIndex(definition);
        }
    }
}
