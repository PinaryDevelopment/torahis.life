using System;
using System.Text.Json.Serialization;

namespace PinaryDevelopment.DataAccess.Contracts
{
    public class AuthorDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }

        [JsonPropertyName("middleName")]
        public string MiddleName { get; set; }

        [JsonPropertyName("lastName")]
        public string LastName { get; set; }

        [JsonPropertyName("primaryAffiliationOrganizationId")]
        public string PrimaryAffiliationOrganizationId { get; set; }

        [JsonPropertyName("createdOn")]
        public DateTimeOffset CreatedOn { get; set; }

        [JsonIgnore]
        [JsonPropertyName("fullName")]
        public string FullName => string.Concat(
            Title.Length > 0 ? $"{Title} " : string.Empty,
            FirstName.Length > 0 ? $"{FirstName} " : string.Empty,
            MiddleName.Length > 0 ? $"{MiddleName} " : string.Empty,
            LastName.Length > 0 ? $"{LastName}" : string.Empty
        );
    }
}