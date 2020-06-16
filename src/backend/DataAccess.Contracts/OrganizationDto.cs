using System;
using System.Text.Json.Serialization;

namespace PinaryDevelopment.DataAccess.Contracts
{
    public class OrganizationDto
    {
        [JsonPropertyName("id")]
        public string Id => SubscriptionId.ToString();

        [JsonPropertyName("subscriptionId")]
        public Guid SubscriptionId { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("createdOn")]
        public DateTimeOffset CreatedOn { get; set; }
    }
}