using System.IO;
using System.Threading.Tasks;

namespace PinaryDevelopment.DataAccess.Contracts
{
    public interface IFilesDal
    {
        Task<string> Create(ShiurDto dto, Stream fileStream);
    }
}