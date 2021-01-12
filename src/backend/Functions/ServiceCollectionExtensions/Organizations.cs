using Microsoft.Extensions.DependencyInjection;
using PinaryDevelopment.TorahIsLife.Organizations.Contracts;
using PinaryDevelopment.TorahIsLife.Organizations.DataAccess;
using PinaryDevelopment.TorahIsLife.Organizations.DataAccess.Contracts;
using PinaryDevelopment.TorahIsLife.Organizations.Services;

namespace PinaryDevelopment.TorahIsLife.Functions.ServiceCollectionExtensions
{
    public static class Organizations
    {
        public static IServiceCollection RegisterOrganizationsServices(this IServiceCollection services)
        {
            services.AddScoped<IOrganizationsDal, OrganizationsDal>();

            services.AddScoped<IOrganizationsService, OrganizationsService>();

            return services;
        }
    }
}
