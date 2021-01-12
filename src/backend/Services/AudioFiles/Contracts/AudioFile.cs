using System;
using System.Collections.Generic;

namespace PinaryDevelopment.TorahIsLife.AudioFiles.Contracts
{
    public class AudioFile
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public TimeSpan Duration { get; set; }
        public int OrderInSeries { get; set; } // used to get next/previous in series
        public DateTimeOffset RecordedOn { get; set; }
        public DateTimeOffset ReleasedOn { get; set; } // for future or past release dates?

        public string AuthorId { get; set; }
        public string OrganizationId { get; set; }
        public IEnumerable<string> TagIds { get; set; }
    }
}
