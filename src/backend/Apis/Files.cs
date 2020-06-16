using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using PinaryDevelopment.Apis.Contracts;
using PinaryDevelopment.DataAccess;
using PinaryDevelopment.DataAccess.Contracts;
using PinaryDevelopment.Extensions;
using System.Linq;
using System.Threading.Tasks;

namespace PinaryDevelopment.Apis
{
    public static class FilesApi
    {
        [FunctionName("Files-Upload")]
        public static async Task FilesUpload([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "files/upload")]HttpRequest request, ILogger log)
        {
            var dal = new AzureFilesDal();

            foreach (var (formFile, index) in request.Form.Files.Select((formFile, index) => (formFile, index)))
            {
                var shiurFormValues = request.Form.Keys.ToDictionary(key => key, key => request.Form[key][index]);
                var shiur = new CreateShiurModel(formFile).Bind(shiurFormValues);

                using (var stream = formFile.OpenReadStream())
                {
                    await dal.Create(shiur.Map<CreateShiurModel, ShiurDto>(), stream).ConfigureAwait(false);
                }
            }
        }
    }
}
