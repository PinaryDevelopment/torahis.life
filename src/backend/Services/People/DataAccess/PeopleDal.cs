using Microsoft.EntityFrameworkCore;
using PinaryDevelopment.TorahIsLife.DataAccess;
using PinaryDevelopment.TorahIsLife.People.DataAccess.Contracts;
using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.People.DataAccess
{
    public class PeopleDal : IPeopleDal
    {
        private TorahIsLifeDbContext DbContext { get; }

        public PeopleDal(TorahIsLifeDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public Task<PersonDto> Create(PersonDto person)
        {
            throw new System.NotImplementedException();
        }

        public Task<PersonDto> Read(string id)
        {
            return DbContext.People.SingleAsync(person => person.Id == id);
        }
    }
}
