using System.Collections.Generic;

namespace PinaryDevelopment.TorahIsLife.AudioFiles.Contracts
{
    public class Metadata
    {
        public string AuthorTitle { get; set; }
        public string AuthorFirstName { get; set; }
        public string AuthorLastName { get; set; }
        public string OrganizationName { get; set; }
        public IEnumerable<Tag> Tags { get; set; }
    }
}
