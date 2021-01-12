using Microsoft.Extensions.DependencyInjection;
using PinaryDevelopment.TorahIsLife.Tags.Contracts;
using PinaryDevelopment.TorahIsLife.Tags.DataAccess;
using PinaryDevelopment.TorahIsLife.Tags.DataAccess.Contracts;
using PinaryDevelopment.TorahIsLife.Tags.Services;

namespace PinaryDevelopment.TorahIsLife.Functions.ServiceCollectionExtensions
{
    public static class Tags
    {
        public static IServiceCollection RegisterTagsServices(this IServiceCollection services)
        {
            services.AddScoped<ITagsDal, TagsDal>();

            services.AddScoped<ITagsService, TagsService>();

            return services;
        }
    }
}
