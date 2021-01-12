using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.Functions
{
    public static class HttpRequestExtensions
    {
        public static async Task<T> BindModelFromBody<T>(this HttpRequest request)
        {
            using var ms = new MemoryStream();
            await request.Body.CopyToAsync(ms);
            var body = Encoding.UTF8.GetString(ms.ToArray());
            return JsonSerializer.Deserialize<T>(body, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
        }

        public static HttpRequest AddCorsAllowOriginHeader(this HttpRequest request)
        {
            request.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", request.Headers["Origin"]);
            request.AddCorsAllowHeadersHeader("Origin");
            return request;
        }

        public static HttpRequest AddCorsAllowMethodHeader(this HttpRequest request, string method)
        {
            request.HttpContext.Response.Headers.Add("Access-Control-Allow-Method", "OPTIONS");
            request.HttpContext.Response.Headers.Add("Access-Control-Allow-Method", method);
            return request;
        }

        public static HttpRequest AddCorsAllowHeadersHeader(this HttpRequest request, string header)
        {
            request.HttpContext.Response.Headers.Append("Access-Control-Allow-Headers", header);
            return request;
        }

        public static HttpRequest AddCorsAllowCredentialsHeader(this HttpRequest request)
        {
            request.HttpContext.Response.Headers.Append("Access-Control-Allow-Credentials", bool.TrueString);
            request.AddCorsAllowHeadersHeader("PD_AUTH");
            return request;
        }

        public static string ReadHost(this HttpRequest request)
        {
            var host = new Uri(request.Headers["Origin"]).Host;

            if (host == "localhost")
            {
                return "torahis.life";
            }

            return host;
        }
    }
}
