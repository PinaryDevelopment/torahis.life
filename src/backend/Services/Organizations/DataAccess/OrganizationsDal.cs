using Microsoft.EntityFrameworkCore;
using PinaryDevelopment.TorahIsLife.DataAccess;
using PinaryDevelopment.TorahIsLife.Organizations.DataAccess.Contracts;
using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.Organizations.DataAccess
{
    public class OrganizationsDal : IOrganizationsDal
    {
        private TorahIsLifeDbContext DbContext { get; }

        public OrganizationsDal(TorahIsLifeDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public Task<OrganizationDto> Read(string id)
        {
            return DbContext.Organizations
                            .SingleAsync(organization => organization.Id == id);
        }

        public Task<OrganizationDto> ReadByHost(string host)
        {
            return DbContext.Organizations
                            .FirstOrDefaultAsync(organization => EF.Functions.Like(organization.Id, $"%{host}"));
        }
    }
}
