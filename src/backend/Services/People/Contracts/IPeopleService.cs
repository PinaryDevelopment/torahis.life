using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.People.Contracts
{
    public interface IPeopleService
    {
        Task<Person> Get(string id);
        Task<Person> Post(Person person);
    }
}
