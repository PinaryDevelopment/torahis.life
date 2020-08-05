using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.DataProtection;

namespace PinaryDevelopment.Apis
{
    public class AuthApi
    {
        private readonly IDataProtector _protector;
        
        public AuthApi(IDataProtectionProvider provider)
        {
            _protector = provider.CreateProtector(GetType().FullName);
        }

        [FunctionName("Login")]
        public async Task<IActionResult> Login([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "auth/login")]HttpRequest request, ILogger log)
        {
            if (request.Cookies.TryGetValue("pd_user", out var value))
            {
                System.Console.WriteLine(value);
            }

            // if (request.Headers["Origin"] == Environment.GetEnvironmentVariable("CORSUrl", EnvironmentVariableTarget.Process))
            // {
                request.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", request.Headers["Origin"]);
            // }

            var idToken = await request.ReadAsStringAsync();

            var client = new HttpClient();
            var response = await client.GetAsync($"https://oauth2.googleapis.com/tokeninfo?id_token={idToken}");
            if (!response.IsSuccessStatusCode)
            {
                return new UnauthorizedResult();
            }

            var content = await response.Content.ReadAsStringAsync();
            var tokenInfo = JsonSerializer.Deserialize<GoogleTokenInfo>(content);

            if (!bool.Parse(tokenInfo.email_verified))
            {
                return new UnauthorizedResult();
            }

            var subToken = new { FirstName = tokenInfo.FirstName, LastName = tokenInfo.LastName, FullName = tokenInfo.FullName, AvatarUrl = tokenInfo.picture };

            return new JsonResult(new
            {
                User = subToken,
                AuthorizationToken = _protector.Protect(JsonSerializer.Serialize(subToken))
            });
        }

        [FunctionName("Test")]
        public IActionResult Test([HttpTrigger(AuthorizationLevel.Anonymous, "get", "options", Route = "auth/test")]HttpRequest request, ILogger log)
        {
            request.HttpContext.Response.Headers.Add("Access-Control-Allow-Credentials", bool.TrueString);
            request.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", request.Headers["Origin"]);
            request.HttpContext.Response.Headers.Add("Access-Control-Allow-Headers", "Authorization");

            var a = request.Headers["Authorization"];

            if (a.Count > 0)
            {
                System.Console.WriteLine("test");
                System.Console.WriteLine(_protector.Unprotect(a[0]));
            }

            return new OkResult();
        }
    }

    public class GoogleTokenInfo
    {
        // {
        //     "iss": "accounts.google.com",
        //     "azp": "000000000000-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
        //     "aud": "000000000000-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
        //     "sub": "000000000000000000000",
        //     "email": "email@domain.tld",
        //     "email_verified": "true",
        //     "at_hash": "xxxxxxxxx-xxxxxxxxxxxx",
        //     "name": "Given Family",
        //     "picture": "https://lh6.googleusercontent.com/-xxxxx-xxxxx/xxxxxxxxxxx/xxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/xxxxx/photo.jpg",
        //     "given_name": "Given",
        //     "family_name": "Family",
        //     "locale": "en",
        //     "iat": "0000000000",
        //     "exp": "0000000000",
        //     "jti": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        //     "alg": "RS256",
        //     "kid": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        //     "typ": "JWT"
        // }
        public string iss { get; set; }
        public string azp { get; set; }
        public string aud { get; set; }
        public string sub { get; set; }
        public string email { get; set; }
        public string email_verified { get; set; }
        public string at_hash { get; set; }
        [JsonPropertyName("name")]
        public string FullName { get; set; }
        public string picture { get; set; }
        [JsonPropertyName("given_name")]
        public string FirstName { get; set; }
        [JsonPropertyName("family_name")]
        public string LastName { get; set; }
        public string locale { get; set; }
        public string iat { get; set; }
        public string exp { get; set; }
        public string jti { get; set; }
        public string alg { get; set; }
        public string kid { get; set; }
        public string typ { get; set; }
    }
}