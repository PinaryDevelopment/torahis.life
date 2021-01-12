using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.Organizations.DataAccess.Contracts
{
    public interface IOrganizationsDal
    {
        Task<OrganizationDto> Read(string id);
        Task<OrganizationDto> ReadByHost(string host);
    }
}
