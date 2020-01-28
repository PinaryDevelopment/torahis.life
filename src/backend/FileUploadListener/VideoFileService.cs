using Data;
using Microsoft.Azure.WebJobs;
using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace FileUploadListener
{
    public class VideoFileService
    {
        public static async Task ProcessFile(ExecutionContext context)
        {
            var (Masechta, Daf) = StaticData.CalculateDafForDate(DateTime.Now);
            var shiurName = $"{Masechta} {Daf}";
            var tempFilePath = Path.GetTempPath();
            var client = new HttpClient();

            /*
             * FIND SHIUR PAGE HREF
             */
            var baseUrl = "https://www.outorah.org";
            var seriesUrl = $"{baseUrl}/series/4033";
            var response = client.GetAsync(seriesUrl).ConfigureAwait(false).GetAwaiter().GetResult();
            var stringContent = response.Content.ReadAsStringAsync().ConfigureAwait(false).GetAwaiter().GetResult();
            var html = new HtmlAgilityPack.HtmlDocument();
            html.LoadHtml(stringContent);

            var elements = html.DocumentNode.SelectNodes("//*[@class='shiur__name']");
            var element = elements.First(e => e.InnerText.Contains(shiurName));
            var attribute = element.Attributes.First(a => a.Name == "href").Value;

            /*
             * FIND VIDEO URL
             */
            response = client.GetAsync($"{baseUrl}{attribute}").ConfigureAwait(false).GetAwaiter().GetResult();
            stringContent = response.Content.ReadAsStringAsync().ConfigureAwait(false).GetAwaiter().GetResult();
            html.LoadHtml(stringContent);
            elements = html.DocumentNode.SelectNodes("//script");
            var shiur = elements.Where(e => e.Attributes.Any(a => a.Name == "type" && a.Value == "application/ld+json"))
                                     .Select(e => System.Text.Json.JsonSerializer.Deserialize<Shiur>(e.InnerHtml))
                                     .FirstOrDefault(e => !string.IsNullOrWhiteSpace(e.contentUrl));


            /*
             DOWNLOAD VIDEO FILE
             */
            var fileName = $"Daf {Daf} ({DateTime.Now.ToString("MMM d yyyy")})";
            var videoFilePath = Path.Combine(tempFilePath, $"{fileName}.mp4");
            response = client.GetAsync(shiur.contentUrl).ConfigureAwait(false).GetAwaiter().GetResult();
            using var content = response.Content.ReadAsStreamAsync().ConfigureAwait(false).GetAwaiter().GetResult();
            using var file = File.Create(videoFilePath);
            content.CopyToAsync(file).ConfigureAwait(false).GetAwaiter().GetResult();
            file.Close();

            /*
            CONVERT VIDEO FILE TO AUDIO FILE
            */
            var mp3FilePath = Path.Combine(tempFilePath, $"{fileName}.mp3");
            var workingDirectory = Path.Combine(context.FunctionAppDirectory, "ffmpeg");
            var pathToExecutable = Path.Combine(workingDirectory, "ffmpeg.exe");

            var info = new ProcessStartInfo
            {
                FileName = pathToExecutable,
                WorkingDirectory = workingDirectory,
                Arguments = $"-y -i \"{videoFilePath}\" -codec:a libmp3lame -b:a 32k -vn -ac 1 \"{mp3FilePath}\"",

                RedirectStandardInput = false,
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var proc = new Process
            {
                StartInfo = info
            };
            proc.Start();
            proc.WaitForExit();

            /*
             UPLOAD FILE TO CLOUD
             */
            var blockBlob = StorageAccount.NewFromConnectionString(Environment.GetEnvironmentVariable("AzureWebJobsStorage", EnvironmentVariableTarget.Process))
                                          .CreateCloudBlobClient()
                                          .GetContainerReference(StaticData.ShiurimContainerName)
                                          .GetBlockBlobReference(Path.Combine("dist/rabbielistefansky/eightminutedaf", Masechta.ToLowerInvariant().Replace(" ", string.Empty), Path.GetFileName(mp3FilePath)));
            blockBlob.Properties.ContentType = "audio/mpeg";
            await blockBlob.UploadFromFileAsync(mp3FilePath).ConfigureAwait(false);
            File.Delete(mp3FilePath);
        }
    }

    internal class Shiur
    {
        public string name { get; set; }
        public string datePublished { get; set; }
        public string contentUrl { get; set; }
    }
}
