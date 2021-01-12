using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.Tags.Contracts
{
    public interface ITagsService
    {
        Task<IEnumerable<Tag>> Get();
    }
}
