using PinaryDevelopment.TorahIsLife.Organizations.Contracts;
using PinaryDevelopment.TorahIsLife.Organizations.DataAccess.Contracts;
using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.Organizations.Services
{
    public class OrganizationsService : IOrganizationsService
    {
        private IOrganizationsDal OrganizationsDal { get; }

        public OrganizationsService(IOrganizationsDal organizationsDal)
        {
            OrganizationsDal = organizationsDal;
        }

        public async Task<Organization> Get(string id)
        {
            return Convert(await OrganizationsDal.Read(id));
        }

        public async Task<Organization> GetByHost(string host)
        {
            return Convert(await OrganizationsDal.ReadByHost(host));
        }

        public Task<Organization> Post(Organization organization)
        {
            throw new System.NotImplementedException();
        }

        private Organization Convert(OrganizationDto organization)
        {
            return new Organization
            {
                Id = organization.Id,
                Name = organization.Name
            };
        }
    }
}
