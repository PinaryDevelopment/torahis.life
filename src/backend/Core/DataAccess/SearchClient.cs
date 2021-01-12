using PinaryDevelopment.TorahIsLife.DataAccess.Contracts;

namespace PinaryDevelopment.TorahIsLife.DataAccess
{
    public class SearchClient<T> : ISearchClient<T>
    {
        public Azure.Search.Documents.SearchClient Client { get; }

        public SearchClient(Azure.Search.Documents.SearchClient client)
        {
            Client = client;
        }
    }
}
