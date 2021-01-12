using PinaryDevelopment.TorahIsLife.Tags.Contracts;
using PinaryDevelopment.TorahIsLife.Tags.DataAccess.Contracts;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.Tags.Services
{
    public class TagsService : ITagsService
    {
        private ITagsDal TagsDal { get; }

        public TagsService(ITagsDal tagsDal)
        {
            TagsDal = tagsDal;
        }

        public async Task<IEnumerable<Tag>> Get()
        {
            return (await TagsDal.Read()).Select(Convert);
        }

        private Tag Convert(TagDto tag)
        {
            return new Tag
            {
                Id = tag.Id,
                Name = tag.Tag,
                TypeId = tag.TypeId
            };
        }
    }
}
