using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess.Contracts
{
    public class AudioFileDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public TimeSpan Duration { get; set; }
        public long OriginalFileSizeInBytes { get; set; }
        public long ProcessedFileSizeInBytes { get; set; }
        public int OrderInSeries { get; set; } // used to get next/previous in series
        public DateTimeOffset RecordedOn { get; set; }
        public DateTimeOffset UploadedOn { get; set; }
        public DateTimeOffset ProcessedOn { get; set; }
        public DateTimeOffset ReleasedOn { get; set; } // for future or past release dates?

        public string AuthorId { get; set; }
        public string OrganizationId { get; set; }
        [NotMapped]
        public ICollection<string> TagIds { get; set; }
    }
}
