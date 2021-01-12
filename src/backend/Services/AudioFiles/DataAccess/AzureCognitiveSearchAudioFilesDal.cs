using Azure.Search.Documents;
using PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess.Contracts;
using PinaryDevelopment.TorahIsLife.DataAccess.Contracts;
using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess
{
    public class AzureCognitiveSearchAudioFilesDal : IAudioFileSearchDal
    {
        private SearchClient SearchClient { get; }

        public AzureCognitiveSearchAudioFilesDal(ISearchClient<AudioFileSearchDto> searchClient)
        {
            SearchClient = searchClient.Client;
        }

        public Task/*Task<Response<IndexDocumentsResult>>*/ Create(AudioFileSearchDto audioFile)
        {
            return SearchClient.MergeOrUploadDocumentsAsync(new[] { audioFile }, new IndexDocumentsOptions { ThrowOnAnyError = true });
        }
    }
}
