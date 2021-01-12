namespace PinaryDevelopment.TorahIsLife.DataAccess.Contracts
{
    public interface ISearchClient<T>
    {
        Azure.Search.Documents.SearchClient Client { get; }
    }
}
