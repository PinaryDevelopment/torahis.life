using System.IO;
using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess.Contracts
{
    public interface IAudioFilesDal
    {
        Task Create(string organizationId, string fileId, Stream stream);
        Task<MemoryStream> Read(string organizationId, string fileId);
    }
}
