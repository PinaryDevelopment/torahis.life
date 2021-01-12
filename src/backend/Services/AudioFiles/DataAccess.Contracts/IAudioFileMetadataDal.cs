using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess.Contracts
{
    public interface IAudioFileMetadataDal
    {
        Task<AudioFileDto> Read(string id);
        Task<AudioFileDto> Create(AudioFileDto audioFile);
        Task<AudioFileDto> Update(AudioFileDto audioFile);
    }
}
