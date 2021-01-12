using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.Tags.DataAccess.Contracts
{
    public interface ITagsDal
    {
        Task<TagDto[]> Read();
    }
}
