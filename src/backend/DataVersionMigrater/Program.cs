using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.Linq;
using System.Text.Json.Serialization;

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
            var tags = v1Data.shiurim
                             .Select(s => new[]
                             {
                                new V2Tag { tag = s.author, type = V2TagType.Author },
                                new V2Tag { tag = s.series, type = V2TagType.Series },
                                new V2Tag { tag = s.subseries, type = V2TagType.Series }
                             }
                             .Concat(s.versions.Select(v => new V2Tag { tag = v.name, type = V2TagType.Series })))
                             .SelectMany(s => s)
                             .GroupBy(s => s.tag)
                             .Select(g => g.First())
                             .ToArray();
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
                                                   Array.FindIndex(tags, t => t.tag == shiur.author),
                                                   Array.FindIndex(tags, t => t.tag == shiur.series),
                                                   Array.FindIndex(tags, t => t.tag == shiur.subseries),
                                                   Array.FindIndex(tags, t => t.tag == version.name)
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

    public enum V2TagType
    {
        Unknown = 0,
        Author = 1,
        Series = 2
    }

    public class V2Tag
    {
        //[JsonPropertyName("0")]
        public string tag { get; set; }
        //[JsonPropertyName("1")]
        public V2TagType type { get; set; }
    }

    public class V2Data
    {
        //[JsonPropertyName("0")]
        public V2Tag[] tags { get; set; }
        //[JsonPropertyName("1")]
        public V2Shiur[] shiurim { get; set; }
    }

    public class V2Shiur
    {
        //[JsonPropertyName("0")]
        public string title { get; set; }
        //[JsonPropertyName("1")]
        public int[] tags { get; set; }
        //[JsonPropertyName("2")]
        public string date { get; set; }
        //[JsonPropertyName("3")]
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
