using Azure.Search.Documents.Indexes;

namespace PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess.Contracts
{
    public class AudioFileSearchDto
    {
        [SimpleField(IsKey = true)]
        public string Id { get; set; }

        [SimpleField(IsSortable = true)]
        public string Title { get; set; }

        [SimpleField()]
        public string Subtitle { get; set; }

        [SimpleField(IsFilterable = true, IsFacetable = true)]
        public string AuthorId { get; set; }

        [SimpleField(IsSortable = true)]
        public string AuthorName { get; set; }

        [SimpleField(IsFilterable = true, IsFacetable = true)]
        public string OrganizationId { get; set; }

        [SimpleField(IsSortable = true)]
        public string OrganizationName { get; set; }

        [SimpleField(IsFilterable = true, IsFacetable = true, IsSortable = true)]
        public string SeriesTitle { get; set; }

        [SimpleField(IsFilterable = true, IsFacetable = true, IsSortable = true)]
        public string SeferTitle { get; set; }

        [SimpleField()]
        public string Metadata { get; set; }
    }
}
