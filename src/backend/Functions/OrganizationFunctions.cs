using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace PinaryDevelopment.TorahIsLife.Functions
{
    public class OrganizationFunctions
    {
        [FunctionName("Organizations-GetConfig")]
        public IActionResult GetConfig([HttpTrigger(AuthorizationLevel.Anonymous, "get", "options", Route = "organizations/config")] HttpRequest request, ILogger log)
        {
            request.AddCorsAllowOriginHeader()
                   .AddCorsAllowMethodHeader("GET");

            if (HttpMethods.IsOptions(request.Method))
            {
                return new OkResult();
            }

            return new OkObjectResult(
                JsonSerializer.Serialize(
                    new {
                        AzureStorage = new
                        {
                            SasToken = "",
                            ContainerName = ""
                        }
                    },
                    new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }
                )
            );
        }
    }
}
