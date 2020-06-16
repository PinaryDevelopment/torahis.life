using System;
using System.Text.Json.Serialization;

namespace PinaryDevelopment.DataAccess.Contracts
{
    public class ShiurDto
    {
        [JsonPropertyName("id")]
        public string Id => StorageId.ToString();

        [JsonPropertyName("storageId")]
        public Guid StorageId { get; set; }

        [JsonPropertyName("authorId")]
        public int AuthorId { get; set; }

        [JsonPropertyName("authorName")]
        public string AuthorName { get; set; }

        [JsonPropertyName("tagIds")]
        public int[] TagIds { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("organizationId")]
        public string OrganizationId { get; set; }

        [JsonPropertyName("organizationName")]
        public string OrganizationName { get; set; }

        [JsonPropertyName("recordedOn")]
        public DateTimeOffset RecordedOn { get; set; }

        [JsonPropertyName("uploadedOn")]
        public DateTimeOffset UploadedOn { get; set; }
    }
}