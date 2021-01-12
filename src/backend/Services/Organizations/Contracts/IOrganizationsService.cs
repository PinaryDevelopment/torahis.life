using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.Organizations.Contracts
{
    public interface IOrganizationsService
    {
        Task<Organization> Get(string id);
        Task<Organization> GetByHost(string host);
        Task<Organization> Post(Organization organization);
    }
}
