using PinaryDevelopment.TorahIsLife.AudioFiles.Contracts;
using PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess.Contracts;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.AudioFiles.Services
{
    public class AudioFileProcessorService
    {
        private IAudioFilesDal AudioFilesDal { get; }

        public AudioFileProcessorService(IAudioFilesDal audioFilesDal)
        {
            AudioFilesDal = audioFilesDal;
        }

        public async Task<ProcessedFile> Process(AudioFile audioFile, Metadata metadata, string rootExecutablesDirectory)
        {
            var originalFileTempPath = string.Empty;
            var reducedFileTempPath = string.Empty;

            try
            {
                using var originalMemoryStream = await AudioFilesDal.Read(audioFile.OrganizationId, audioFile.Id);
                var tempFileDirectory = Path.GetTempPath();
                originalFileTempPath = await SaveToDisk(audioFile, originalMemoryStream, tempFileDirectory);

                var originalFileSize = originalMemoryStream.Length;
                /* Need to grab the duration before file processing as it doesn't give the correct value after ffmpeg is done processing the file. */
                var tagLibFile = TagLib.File.Create(originalFileTempPath);
                var duration = tagLibFile.Properties.Duration;


                reducedFileTempPath = await ReduceFileBitRate(audioFile, tempFileDirectory, originalFileTempPath, rootExecutablesDirectory).ConfigureAwait(false);
                AnnotateFileWithMetadata(audioFile, metadata, reducedFileTempPath);

                using var reducedFileMemoryStream = new MemoryStream();
                using var fileStream = File.OpenRead(reducedFileTempPath);
                await fileStream.CopyToAsync(reducedFileMemoryStream);
                await AudioFilesDal.Create(audioFile.OrganizationId, audioFile.Id, reducedFileMemoryStream);
                var reducedFileSize = reducedFileMemoryStream.Length;

                return new ProcessedFile(originalFileSize, duration, reducedFileSize);
            }
            finally
            {
                CleanupTempFiles(originalFileTempPath, reducedFileTempPath);
            }
        }

        private async Task<string> SaveToDisk(AudioFile audioFile, MemoryStream ms, string tempFileDirectory)
        {
            var localFilePath = Path.Combine(tempFileDirectory, $"original-{audioFile.Id}");
            Directory.CreateDirectory(Path.GetDirectoryName(localFilePath));
            using var fileStream = File.Create(localFilePath);
            await ms.CopyToAsync(fileStream).ConfigureAwait(false);
            return localFilePath;
        }

        private Task<string> ReduceFileBitRate(AudioFile audioFile, string tempFileDirectory, string originalFileTempPath, string rootExecutablesDirectory)
        {
            const string ReducedBitRate = "32k";

            return Task.Run(() =>
            {
                var workingDirectory = Path.Combine(rootExecutablesDirectory, "ffmpeg");
                var pathToExecutable = Path.Combine(workingDirectory, "ffmpeg.exe");
                var outputFileName = $"{audioFile.Id}.mp3";
                var outputFilePath = Path.Combine(tempFileDirectory, outputFileName);

                var info = new ProcessStartInfo
                {
                    FileName = pathToExecutable,
                    WorkingDirectory = workingDirectory,
                    Arguments = $"-y -i \"{originalFileTempPath}\" -codec:a libmp3lame -b:a {ReducedBitRate} -ac 1 \"{outputFilePath}\"",

                    RedirectStandardInput = false,
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using var proc = new Process
                {
                    StartInfo = info
                };
                proc.Start();
                proc.WaitForExit();

                return outputFilePath;
            });
        }

        private void AnnotateFileWithMetadata(AudioFile audioFile, Metadata metadata, string reducedFileTempPath)
        {
            var tagLibFile = TagLib.File.Create(reducedFileTempPath);

            tagLibFile.Tag.Album = metadata.Tags.FirstOrDefault(t => t.TypeId == TagType.SeriesTitle)?.Name;
            tagLibFile.Tag.AlbumArtists = new[] { $"{metadata.AuthorTitle} {metadata.AuthorFirstName} {metadata.AuthorLastName}" };
            tagLibFile.Tag.Track = System.Convert.ToUInt32(audioFile.OrderInSeries);
            tagLibFile.Tag.Title = $"{metadata.Tags.FirstOrDefault(t => t.TypeId == TagType.SeferTitle)?.Name}, {audioFile.Title}";
            tagLibFile.Tag.Year = System.Convert.ToUInt32(audioFile.RecordedOn.Year);
            tagLibFile.Tag.Genres = new[] { metadata.Tags.FirstOrDefault(t => t.TypeId == TagType.SeriesTitle)?.Name, metadata.Tags.FirstOrDefault(t => t.TypeId == TagType.SeferTitle)?.Name };
            tagLibFile.Tag.Comment = metadata.Tags.FirstOrDefault(t => t.TypeId == TagType.Subtitle)?.Name;
            tagLibFile.Tag.Copyright = $"{audioFile.RecordedOn.Year} © {metadata.AuthorTitle} {metadata.AuthorFirstName} {metadata.AuthorLastName}";

            //// TODO: do the commented out sections matter? if so, find strategy to define these to be more generic
            ////tagLibFile.Tag.TrackCount = Convert.ToUInt32(masechtaMetadata.DafimInMasechta);
            ////tagLibFile.Tag.Disc = Convert.ToUInt32(Array.FindIndex(StaticData.Gemaras, m => m == masechtaMetadata));
            ////tagLibFile.Tag.DiscCount = Convert.ToUInt32(StaticData.Gemaras.Length);

            tagLibFile.Save();
        }

        private void CleanupTempFiles(string originalFileTempPath, string reducedFileTempPath)
        {
            if (File.Exists(originalFileTempPath))
            {
                File.Delete(originalFileTempPath);
            }

            if (File.Exists(reducedFileTempPath))
            {
                File.Delete(reducedFileTempPath);
            }
        }
    }
}
