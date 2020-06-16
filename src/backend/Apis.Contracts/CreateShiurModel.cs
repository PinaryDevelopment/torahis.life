using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using PinaryDevelopment.Extensions;

namespace PinaryDevelopment.Apis.Contracts
{    public class CreateShiurModel
    {
        public Guid StorageId { get; set; }
        // public string NewAuthorName { get; set; }
        public int AuthorId { get; set; }
        public int[] TagIds { get; set; }
        // public string[] NewTags { get; set; }
        public string Title { get; set; }
        public string OrganizationId { get; set; }
        public DateTimeOffset RecordedOn { get; set; }
        public DateTimeOffset UploadedOn { get; set; }
        public IFormFile FormFile { get; set; }

        public CreateShiurModel(IFormFile formFile)
        {
            FormFile = formFile;
            StorageId = Guid.NewGuid();
        }

        public CreateShiurModel Bind(IDictionary<string, string> values)
        {
            return this.BindModel(values);
        }
    }
}