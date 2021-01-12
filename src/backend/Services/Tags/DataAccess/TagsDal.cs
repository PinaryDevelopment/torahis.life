using Microsoft.EntityFrameworkCore;
using PinaryDevelopment.TorahIsLife.DataAccess;
using PinaryDevelopment.TorahIsLife.Tags.DataAccess.Contracts;
using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.Tags.DataAccess
{
    public class TagsDal : ITagsDal
    {
        private TorahIsLifeDbContext DbContext { get; }

        public TagsDal(TorahIsLifeDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public Task<TagDto[]> Read()
        {
            return DbContext.Tags.ToArrayAsync();
        }
    }
}
