using PinaryDevelopment.TorahIsLife.AudioFiles.Contracts;
using PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess.Contracts;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Storage.Queue;

namespace PinaryDevelopment.TorahIsLife.AudioFiles.Services
{
    public class AudioFilesService : IAudioFilesService
    {
        private IAudioFileMetadataDal AudioFileMetadataDal { get; }
        private IAudioFileSearchDal AudioFileSearchDal { get; }

        private CloudQueueClient CloudQueueClient { get; }
        private AudioFileProcessorService AudioFileProcessorService { get; }

        public AudioFilesService(
            IAudioFileMetadataDal audioFileMetadataDal,
            CloudQueueClient cloudQueueClient,
            IAudioFileSearchDal audioFileSearchDal,
            AudioFileProcessorService audioFileProcessorService
        )
        {
            AudioFileMetadataDal = audioFileMetadataDal;
            AudioFileSearchDal = audioFileSearchDal;
            CloudQueueClient = cloudQueueClient;
            AudioFileProcessorService = audioFileProcessorService;
        }
        
        public async Task<AudioFile> Get(string id)
        {
            return Convert(await AudioFileMetadataDal.Read(id));
        }

        public async Task<AudioFile> Post(AudioFile metadata)
        {
            if (!string.IsNullOrWhiteSpace(metadata.Id))
            {
                throw new InvalidOperationException("Audio file can't be created when it already has an Id. Put should be called instead on this entity to perform an update operation.");
            }

            if (!string.IsNullOrWhiteSpace(metadata.AuthorId))
            {
                throw new InvalidOperationException("Audio file can't be created when it doesn't have an author. Associate this entity with an author and try again.");
            }

            // TODO: derive this value from the referer header
            if (!string.IsNullOrWhiteSpace(metadata.OrganizationId))
            {
                throw new InvalidOperationException("Audio file can't be created when it doesn't have an organization. Associate this entity with an organization and try again.");
            }

            metadata.Id = Guid.NewGuid().ToString();

            var dto = Convert(metadata);

            await AudioFileMetadataDal.Create(dto);

            return Convert(dto);
        }

        public Task EnqueueMessageToProcessAudioFile(string id)
        {
            var message = new CloudQueueMessage(Guid.NewGuid().ToString());
            message.SetMessageContent2($"{{ \"id\": \"{id}\" }}", false);

            return CloudQueueClient.GetQueueReference("til-audiofiles")
                                   .AddMessageAsync(message);
        }

        public async Task<AudioFile> ProcessFile(AudioFile audioFile, Metadata metadata, string rootExecutablesDirectory)
        {
            var processedFile = await AudioFileProcessorService.Process(audioFile, metadata, rootExecutablesDirectory);

            var dto = await AudioFileMetadataDal.Read(audioFile.Id);
            dto.Duration = processedFile.FileDuration;
            dto.OriginalFileSizeInBytes = processedFile.OriginalFileSize;
            dto.ProcessedFileSizeInBytes = processedFile.ReducedFileSize;
            dto.ProcessedOn = DateTimeOffset.Now;

            dto = await AudioFileMetadataDal.Update(dto);
            await AudioFileSearchDal.Create(ConvertToSearchDto(dto, metadata));

            return Convert(dto);
        }

        private AudioFileDto Convert(AudioFile audioFile)
        {
            return new AudioFileDto
            {
                AuthorId = audioFile.AuthorId,
                Duration = audioFile.Duration,
                Id = audioFile.Id,
                OrderInSeries = audioFile.OrderInSeries,
                OrganizationId = audioFile.OrganizationId,
                TagIds = audioFile.TagIds.ToArray(),
                Title = audioFile.Title,
                UploadedOn = DateTimeOffset.Now
            };
        }

        private AudioFile Convert(AudioFileDto audioFile)
        {
            return new AudioFile
            {
                AuthorId = audioFile.AuthorId,
                Duration = audioFile.Duration,
                Id = audioFile.Id,
                OrderInSeries = audioFile.OrderInSeries,
                OrganizationId = audioFile.OrganizationId,
                TagIds = audioFile.TagIds.ToArray(),
                Title = audioFile.Title,
                RecordedOn = audioFile.RecordedOn,
                ReleasedOn = audioFile.ReleasedOn
            };
        }

        private AudioFileSearchDto ConvertToSearchDto(AudioFileDto audioFile, Metadata metadata)
        {
            return new AudioFileSearchDto
            {
                AuthorId = audioFile.AuthorId,
                AuthorName = $"{metadata.AuthorTitle} {metadata.AuthorFirstName} {metadata.AuthorLastName}",
                Id = audioFile.Id,
                Metadata = metadata.Tags.Any(t => t.TypeId == TagType.Metadata) ? string.Join(Environment.NewLine, metadata.Tags.Where(tag => tag.TypeId == TagType.Metadata).Select(tag => tag.Name)) : string.Empty,
                OrganizationId = audioFile.OrganizationId,
                OrganizationName = metadata.OrganizationName,
                SeferTitle = metadata.Tags.FirstOrDefault(t => t.TypeId == TagType.SeferTitle)?.Name,
                SeriesTitle = metadata.Tags.FirstOrDefault(t => t.TypeId == TagType.SeriesTitle)?.Name,
                Subtitle = metadata.Tags.FirstOrDefault(t => t.TypeId == TagType.Subtitle)?.Name,
                Title = audioFile.Title
            };
        }
    }
}
