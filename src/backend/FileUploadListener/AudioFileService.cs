using Data;
using Microsoft.Azure.WebJobs;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FileUploadListener
{
    public class AudioFileService
    {
        private ICloudBlob IncomingBlob { get; }
        private string TempLocalFilePath { get; set; }
        public CloudBlockBlob OutgoingBlobReference { get; set; }
        private AudioFileName AudioFileName { get; }
        private string TempFileDirectory { get; }
        private ExecutionContext ExecutionContext { get; }
        public TimeSpan Duration { get; private set; }

        public AudioFileService(ICloudBlob blob, ExecutionContext context)
        {
            IncomingBlob = blob;
            AudioFileName = new AudioFileName(blob.Name);
            TempFileDirectory = Path.GetTempPath();
            ExecutionContext = context;
        }

        public async Task ProcessFile(PodcastMetadata podcastMetadata)
        {
            await SaveToDisk().ConfigureAwait(false);
            var tagLibFile = TagLib.File.Create(TempLocalFilePath);
            Duration = tagLibFile.Properties.Duration;
            await ReduceFileBitRate().ConfigureAwait(false);
            CreateUploadBlobReference();
            AnnotateFileWithMetadata(podcastMetadata);
            await UploadFileToCloud().ConfigureAwait(false);
        }

        private async Task SaveToDisk()
        {
            var localFilePath = Path.Combine(TempFileDirectory, Path.GetFileName(IncomingBlob.Name));
            Directory.CreateDirectory(Path.GetDirectoryName(localFilePath));
            using var fileStream = File.Create(localFilePath);
            await IncomingBlob.DownloadToStreamAsync(fileStream).ConfigureAwait(false);
            TempLocalFilePath = localFilePath;
        }

        private void CreateUploadBlobReference()
        {
            var incomingBlobFilePathParts = IncomingBlob.Name.Split(new[] { Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar });
            var outgoingBlobFilePath = "dist";
            foreach (var incomingPathPart in incomingBlobFilePathParts.Skip(1).Take(incomingBlobFilePathParts.Length - 2))
            {
                outgoingBlobFilePath = Path.Combine(outgoingBlobFilePath, incomingPathPart);
            }
            OutgoingBlobReference = IncomingBlob.Container.GetBlockBlobReference(Path.Combine(outgoingBlobFilePath, Path.GetFileName(TempLocalFilePath)));
        }

        private Task UploadFileToCloud()
        {
            OutgoingBlobReference.Properties.ContentType = "audio/mpeg";
            return OutgoingBlobReference.UploadFromFileAsync(TempLocalFilePath)
                                            .ContinueWith(task =>
                                            {
                                                File.Delete(TempLocalFilePath);
                                                TempLocalFilePath = string.Empty;
                                                return task;
                                            });
        }

        private const string ReducedBitRate = "32k";
        private Task ReduceFileBitRate()
        {
            return Task.Run(() =>
            {
                var workingDirectory = Path.Combine(ExecutionContext.FunctionAppDirectory, "ffmpeg");
                var pathToExecutable = Path.Combine(workingDirectory, "ffmpeg.exe");
                var outputFileName = $"Daf {AudioFileName.Daf} - {AudioFileName.Subtitle} ({AudioFileName.RecordedOn.ToString("MMM d yyyy")}).mp3";
                var outputFilePath = Path.Combine(TempFileDirectory, outputFileName);

                var info = new ProcessStartInfo
                {
                    FileName = pathToExecutable,
                    WorkingDirectory = workingDirectory,
                    Arguments = $"-y -i \"{TempLocalFilePath}\" -codec:a libmp3lame -b:a {ReducedBitRate} -ac 1 \"{outputFilePath}\"",

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

                File.Delete(TempLocalFilePath);

                TempLocalFilePath = outputFilePath;
            });
        }

        private void AnnotateFileWithMetadata(PodcastMetadata podcastMetadata)
        {
            var masechtaMetadata = StaticData.Gemaras.First(masechta => masechta.Title.Equals(AudioFileName.Masechta, StringComparison.OrdinalIgnoreCase));
            var tagLibFile = TagLib.File.Create(TempLocalFilePath);

            tagLibFile.Tag.Album = $"{podcastMetadata.Title} - {AudioFileName.Masechta}";
            tagLibFile.Tag.AlbumArtists = new[] { podcastMetadata.Author };
            tagLibFile.Tag.Track = uint.Parse(AudioFileName.Daf) - 1;
            tagLibFile.Tag.TrackCount = Convert.ToUInt32(masechtaMetadata.DafimInMasechta);
            tagLibFile.Tag.Title = $"Masechta {AudioFileName.Masechta}, Daf {AudioFileName.Daf}";
            tagLibFile.Tag.Year = Convert.ToUInt32(AudioFileName.RecordedOn.Year);
            tagLibFile.Tag.Disc = Convert.ToUInt32(Array.FindIndex(StaticData.Gemaras, m => m == masechtaMetadata));
            tagLibFile.Tag.DiscCount = Convert.ToUInt32(StaticData.Gemaras.Length);
            tagLibFile.Tag.Genres = new[] { "Daf Yomi" };
            tagLibFile.Tag.Comment = AudioFileName.Subtitle;
            tagLibFile.Tag.Copyright = $"{AudioFileName.RecordedOn.Year} © {podcastMetadata.Author}";

            tagLibFile.Save();
        }
    }
}
