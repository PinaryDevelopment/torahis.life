using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.People.DataAccess.Contracts
{
    public interface IPeopleDal
    {
        Task<PersonDto> Read(string id);
        Task<PersonDto> Create(PersonDto person);
    }
}
