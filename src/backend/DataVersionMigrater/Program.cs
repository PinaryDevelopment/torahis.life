﻿using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.Linq;
using Microsoft.Azure.WebJobs;

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
            await SaveV2Data(v2Data).ConfigureAwait(false);
        }

        public static async Task SaveV2Data(V2Data v2Data)
        {
            var localFilePath = Path.Combine(Path.GetTempPath(), "data.json");
            var data = JsonSerializer.Serialize(v2Data);
            File.WriteAllText(localFilePath, data);
            await StorageAccount.NewFromConnectionString("UseDevelopmentStorage=true")
                                                     .CreateCloudBlobClient()
                                                     .GetContainerReference("shiurim")
                                                     .GetBlockBlobReference("data.json")
                                                     .UploadTextAsync(data)
                                                     .ConfigureAwait(false);
        }

        public static V2Data TransformV1ToV2(V1Data v1Data)
        {
            var tags = v1Data.shiurim
                             .Select(s => new[]
                             {
                                //new V2Tag { tag = s.author, type = V2TagType.Author },
                                new V2Tag { tag = s.series, type = V2TagType.Series },
                                new V2Tag { tag = s.subseries, type = V2TagType.Series }
                             }
                             .Concat(s.versions.Select(v => new V2Tag { tag = v.name, type = V2TagType.Series })))
                             .SelectMany(s => s)
                             .GroupBy(s => s.tag)
                             .Select(g => g.First())
                             .ToArray();
            var id = 1;
            foreach (var tag in tags)
            {
                tag.id = id++;
            }
            var authors = new V2Author[]
            {
                new V2Author { id = 1, name = "Rabbi Yosef Bromberg" }
            };
            id = 1;
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
                                                    //Array.FindIndex(tags, t => t.tag == shiur.author),
                                                    tags.First(t => t.tag == shiur.series).id,
                                                    tags.First(t => t.tag == shiur.subseries).id,
                                                    tags.First(t => t.tag == version.name).id
                                                },
                                                duration = version.duration,
                                                date = date.ToString("s"),
                                                id = id++,
                                                authorId = 1
                                            };
                                           }
                                        )
                                 )
                                 .SelectMany(s => s)
                                 .ToArray();

            foreach (var shiur in shiurim)
            {
                shiur.previousId = shiurim.FirstOrDefault(s => (s.id == shiur.id - 1 && s.title != shiur.title && s.tags[2] == shiur.tags[2]) || (s.id == shiur.id - 2 && s.title != shiur.title))?.id;
                shiur.nextId = shiurim.FirstOrDefault(s => (s.id == shiur.id + 1 && s.title != shiur.title && s.tags[2] == shiur.tags[2]) || (s.id == shiur.id + 2 && s.title != shiur.title))?.id;
            }

            return new V2Data
            {
                shiurim = shiurim,
                tags = tags,
                authors = authors
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
        Series = 1
    }

    public class V2Tag
    {
        public int id { get; set; }
        //[JsonPropertyName("0")]
        public string tag { get; set; }
        //[JsonPropertyName("1")]
        public V2TagType type { get; set; }
    }

    public class V2Author
    {
        public int id { get; set; }
        public string name { get; set; }
    }

    public class V2Data
    {
        //[JsonPropertyName("0")]
        public V2Tag[] tags { get; set; }
        //[JsonPropertyName("1")]
        public V2Shiur[] shiurim { get; set; }
        public V2Author[] authors { get; set; }
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
        public int id { get; set; }
        public int? previousId { get; set; }
        public int? nextId { get; set; }
        public int authorId { get; set; }
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
