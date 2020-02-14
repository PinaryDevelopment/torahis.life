using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.Linq;

namespace DataVersionMigrater
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            await ConvertV1ToV2().ConfigureAwait(false);
        }

        public static async Task ConvertV1ToV2()
        {
            var v1Data = await GetV1Data().ConfigureAwait(false);
            var v2Data = TransformV1ToV2(v1Data);
            SaveV2Data(v2Data);
        }

        public static void SaveV2Data(V2Data v2Data)
        {
            var localFilePath = Path.Combine(Directory.GetCurrentDirectory(), "datav2.json");
            File.WriteAllText(localFilePath, JsonSerializer.Serialize(v2Data));
        }

        public static V2Data TransformV1ToV2(V1Data v1Data)
        {
            var tags = v1Data.shiurim.Select(s => new[] { s.author, s.series, s.subseries }.Concat(s.versions.Select(v => v.name))).SelectMany(s => s).Distinct().ToArray();
            var shiurim =  v1Data.shiurim
                                 .Select(shiur =>
                                   shiur.versions
                                        .Select(version => {
                                            var date = DateTime.ParseExact(shiur.date, "MMM d yyyy", null);
                                            date = date.AddHours(version.name.Equals("with Rashi", StringComparison.OrdinalIgnoreCase) ? 6 : 22);
                                            return new V2Shiur
                                            {
                                                title = shiur.title,
                                                tags = new[]
                                                {
                                                   Array.IndexOf(tags, shiur.author),
                                                   Array.IndexOf(tags, shiur.series),
                                                   Array.IndexOf(tags, shiur.subseries),
                                                   Array.IndexOf(tags, version.name)
                                               },
                                               duration = version.duration,
                                               date = date.ToString("s")
                                            };
                                           }
                                        )
                                 )
                                 .SelectMany(s => s)
                                 .ToArray();
            return new V2Data
            {
                shiurim = shiurim,
                tags = tags
            };
        }

        public static async Task<V1Data> GetV1Data()
        {
            var localFilePath = Path.Combine(Directory.GetCurrentDirectory(), "data.json");
            string v1DataString;
            if (File.Exists(localFilePath))
            {
                v1DataString = File.ReadAllText(localFilePath);
            }
            else
            {
                var httpClient = new HttpClient();
                var response = await httpClient.GetAsync("https://raw.githubusercontent.com/PinaryDevelopment/torahis.life/master/docs/data/data.json").ConfigureAwait(false);
                v1DataString = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                File.WriteAllText(localFilePath, v1DataString);
            }

            return JsonSerializer.Deserialize<V1Data>(v1DataString);
        }
    }

    public class V2Data
    {
        public string[] tags { get; set; }
        public V2Shiur[] shiurim { get; set; }
    }

    public class V2Shiur
    {
        public string title { get; set; }
        public int[] tags { get; set; }
        public string date { get; set; }
        public string duration { get; set; }
    }

    public class V1Data
    {
        public V1Shiur[] shiurim { get; set; }
    }

    public class V1Shiur
    {
        public string author { get; set; }
        public string date { get; set; }
        public string series { get; set; }
        public string subseries { get; set; }
        public string title { get; set; }
        public V1Version[] versions { get; set; }
    }

    public class V1Version
    {
        public string name { get; set; }
        public string duration { get; set; }
    }
}
