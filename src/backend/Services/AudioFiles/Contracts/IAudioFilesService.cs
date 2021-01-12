using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.AudioFiles.Contracts
{
    public interface IAudioFilesService
    {
        Task<AudioFile> Get(string id);
        Task<AudioFile> Post(AudioFile metadata);
        Task EnqueueMessageToProcessAudioFile(string id);
        Task<AudioFile> ProcessFile(AudioFile audioFile, Metadata metadata, string rootExecutablesDirectory);
    }
}
