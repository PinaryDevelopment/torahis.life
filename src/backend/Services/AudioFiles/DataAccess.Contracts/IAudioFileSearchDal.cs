using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess.Contracts
{
    public interface IAudioFileSearchDal
    {
        Task Create(AudioFileSearchDto audioFile);
    }
}
