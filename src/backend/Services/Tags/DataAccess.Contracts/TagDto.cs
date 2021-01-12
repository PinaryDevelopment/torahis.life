namespace PinaryDevelopment.TorahIsLife.Tags.DataAccess.Contracts
{
    public class TagDto
    {
        public string Id { get; set; }
        public string Tag { get; set; }

        public string TypeId { get; set; }
        public TagTypeDto Type { get; set; }
    }
}
