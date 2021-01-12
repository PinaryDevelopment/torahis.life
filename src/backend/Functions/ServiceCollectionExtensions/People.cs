using Microsoft.Extensions.DependencyInjection;
using PinaryDevelopment.TorahIsLife.People.Contracts;
using PinaryDevelopment.TorahIsLife.People.DataAccess;
using PinaryDevelopment.TorahIsLife.People.DataAccess.Contracts;
using PinaryDevelopment.TorahIsLife.People.Services;

namespace PinaryDevelopment.TorahIsLife.Functions.ServiceCollectionExtensions
{
    public static class People
    {
        public static IServiceCollection RegisterPeopleServices(this IServiceCollection services)
        {
            services.AddScoped<IPeopleDal, PeopleDal>();

            services.AddScoped<IPeopleService, PeopleService>();

            return services;
        }
    }
}
