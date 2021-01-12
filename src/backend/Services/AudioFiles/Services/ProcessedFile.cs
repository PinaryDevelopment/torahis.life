using System;

namespace PinaryDevelopment.TorahIsLife.AudioFiles.Services
{
    public class ProcessedFile
    {
        public TimeSpan FileDuration { get; }
        public long OriginalFileSize { get; }
        public long ReducedFileSize { get; }

        public ProcessedFile(long originalFileSize, TimeSpan fileDuration, long reducedFileSize)
        {
            FileDuration = fileDuration;
            OriginalFileSize = originalFileSize;
            ReducedFileSize = reducedFileSize;
        }
    }
}
