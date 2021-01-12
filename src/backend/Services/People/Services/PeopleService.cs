using PinaryDevelopment.TorahIsLife.People.Contracts;
using PinaryDevelopment.TorahIsLife.People.DataAccess.Contracts;
using System;
using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.People.Services
{
    public class PeopleService : IPeopleService
    {
        private IPeopleDal PeopleDal { get; }

        public PeopleService(IPeopleDal peopleDal)
        {
            PeopleDal = peopleDal;
        }

        public async Task<Person> Get(string id)
        {
            return Convert(await PeopleDal.Read(id));
        }

        public Task<Person> Post(Person person)
        {
            throw new NotImplementedException();
            //return PeopleDal.Create(person);
        }

        private Person Convert(PersonDto person)
        {
            return new Person
            {
                FirstName = person.FirstName,
                Id = person.Id,
                LastName = person.LastName,
                Title = person.Title
            };
        }
    }
}
