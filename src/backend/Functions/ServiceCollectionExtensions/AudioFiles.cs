using Azure;
using Microsoft.Extensions.DependencyInjection;
using PinaryDevelopment.TorahIsLife.AudioFiles.Contracts;
using PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess;
using PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess.Contracts;
using PinaryDevelopment.TorahIsLife.AudioFiles.Services;
using PinaryDevelopment.TorahIsLife.DataAccess;
using PinaryDevelopment.TorahIsLife.DataAccess.Contracts;
using System;

namespace PinaryDevelopment.TorahIsLife.Functions.ServiceCollectionExtensions
{
    public static class AudioFiles
    {
        public static IServiceCollection RegisterAudioFileServices(this IServiceCollection services)
        {
            services.AddSingleton<ISearchClient<AudioFileSearchDto>>(serviceProvider =>
            {
                string searchServiceEndPoint = "";
                string indexName = "audio-files";
                var azureKeyCredential = serviceProvider.GetService<AzureKeyCredential>();
                return new SearchClient<AudioFileSearchDto>(new Azure.Search.Documents.SearchClient(new Uri(searchServiceEndPoint), indexName, azureKeyCredential));
            });

            services.AddScoped<IAudioFilesDal, AzureStorageContainerAudioFilesDal>();
            services.AddScoped<IAudioFileMetadataDal, AudioFileMetadataDal>();
            services.AddScoped<IAudioFileSearchDal, AzureCognitiveSearchAudioFilesDal>();

            services.AddSingleton<AudioFileProcessorService>();
            services.AddScoped<IAudioFilesService, AudioFilesService>();

            return services;
        }
    }
}
