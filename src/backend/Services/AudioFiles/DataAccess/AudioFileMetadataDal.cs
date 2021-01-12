using Microsoft.EntityFrameworkCore;
using PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess.Contracts;
using PinaryDevelopment.TorahIsLife.DataAccess;
using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess
{
    public class AudioFileMetadataDal : IAudioFileMetadataDal
    {
        private TorahIsLifeDbContext DbContext { get; }

        public AudioFileMetadataDal(TorahIsLifeDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public async Task<AudioFileDto> Create(AudioFileDto audioFile)
        {
            var savedAudioFile = DbContext.AudioFiles.Add(audioFile);
            await DbContext.SaveChangesAsync();
            return savedAudioFile.Entity;
        }

        public Task<AudioFileDto> Read(string id)
        {
            return DbContext.AudioFiles.SingleAsync(audioFile => audioFile.Id == id);
        }

        public async Task<AudioFileDto> Update(AudioFileDto audioFile)
        {
            await DbContext.SaveChangesAsync();
            return audioFile;
        }
    }
}
