using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using System.Xml;

namespace FileUploadListener
{
    public class Podcast
    {
        public string Author { get; set; }          // Rabbi Yosef Bromberg
        public string Title { get; set; }           // "Daf Yomi with Rabbi Yosef Bromberg - Full"
        public string Description { get; set; }     // "A daf yomi shiur given by Rabbi Yosef Bromberg. This version includes the daf and Rashi."
        public string RootUrl { get; set; }         // "https://www.torahis.life/daf-yomi/rabbi-yosef-bromberg/full"
        public string ImageUrl => $"{RootUrl}/podcast3000x3000.png";
        public string FeedUrl => $"{RootUrl}/podcast.xml";
    }

    public class Entry
    {
        public string Title { get; set; }
        public string Url { get; set; }
        public DateTime PublishedOn { get; set; }
        public string Description { get; set; }
        public string Duration { get; set; }
        public long SizeInBytes { get; set; }
    }

    public class PodcastService
    {
        /*
        <rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:rawvoice="http://www.rawvoice.com/rawvoiceRssModule/" version="2.0">
        <channel>
            <title>Podcast Title Here</title>
            <link>https://www.example.com</link>
            <image>
                <url>http://www.example.com/image3000x3000.png</url>
                <title>Podcast Title Here</title>
                <link>https://www.example.com</link>
            </image>
            <description>
                The full length description for your podcast
            </description>
            <language>en-us</language>
            <copyright>Nic Raboy copyright 2016</copyright>
            <atom:link href = "https://podcasts.thepolyglotdeveloper.com/podcast.xml" rel= "self" type= "application/rss+xml" />
            <lastBuildDate> Fri, 01 Jan 2016 06:00:00 PDT</lastBuildDate>

            <itunes:author>Nic Raboy</itunes:author>
            <itunes:summary>
                The full length description for your podcast
            </itunes:summary>
            <itunes:subtitle>Short sentence about the podcast</itunes:subtitle>
            <itunes:owner>
                <itunes:name>Nic Raboy</itunes:name>
                <itunes:email>email@test.com</itunes:email>
            </itunes:owner>
            <itunes:explicit>No</itunes:explicit>
            <itunes:keywords>
                comma, separated, key, words
            </itunes:keywords>
            <itunes:image href="http://www.example.com/image3000x3000.png" />

            <rawvoice:rating>TV-G</rawvoice:rating>
            <rawvoice:location>San Francisco, California</rawvoice:location>
            <rawvoice:frequency>Monthly</rawvoice:frequency>
            <itunes:category text="Technology" />
            <pubDate> Fri, 01 Jan 2016 06:00:00 PDT</pubDate>
            <item>
                <title>Episode Name 2</title>
                <link>
                    http://podcast.example.com/episode2.mp4
                </link>
                <pubDate>Sat, 02 Jan 2016 16:00:00 PDT</pubDate>
                <description>
                    The full length episode 2 description
                </description>
                <enclosure url="http://podcasts.example.com/episode.mp4" length="36715125" type="audio/mpeg"/>
                <guid>
                    http://podcast.example.com/episode2.mp4
                </guid>
                <itunes:duration>19:07</itunes:duration>
                <itunes:summary>
                    The full length episode 2 description
                </itunes:summary>
                <itunes:image href="http://www.example.com/image3000x3000.png"/>
                <itunes:keywords>
                    comma,separated,key,words
                </itunes:keywords>
                <itunes:explicit>no</itunes:explicit>
            </item>
        </channel>
        </rss>
        */
        public string GenerateRssFeed(Podcast podcast, IEnumerable<Entry> entries)
        {
            var document = new XmlDocument();
            document.AppendChild(Document.CreateXmlDeclaration("1.0", "UTF-8", null));
            document.AppendChild(GenerateRssElement(podcast, entries));
            var memoryStream = new MemoryStream();
            Document.Save(memoryStream);
            return Encoding.UTF8.GetString(memoryStream.ToArray());
        }

        private XmlDocument Document { get; }

        private readonly Dictionary<string, string> NamespaceLookup = new Dictionary<string, string>
        {
            { "itunes", "http://www.itunes.com/dtds/podcast-1.0.dtd" },
            { "atom", "http://www.w3.org/2005/Atom" },
            { "rawvoice", "http://www.rawvoice.com/rawvoiceRssModule/" }
        };

        private XmlElement GenerateRssElement(Podcast podcast, IEnumerable<Entry> entries)
        {
            var rssElement = Document.CreateElement("rss");
            foreach (var namspace in NamespaceLookup)
            {
                rssElement.SetAttribute($"xmlns:{namspace.Key}", namspace.Value);
            }
            rssElement.SetAttribute("version", "2.0");
            rssElement.AppendChild(GenerateChannelElement(podcast, entries));
            return rssElement;
        }

        private XmlElement GenerateChannelElement(Podcast podcast, IEnumerable<Entry> entries)
        {
            var channelElement = Document.CreateElement("channel");
            channelElement.AppendChild(GenerateElementWithInnerText("title", podcast.Title));
            channelElement.AppendChild(GenerateElementWithInnerText("link", podcast.RootUrl));

            var imageElement = Document.CreateElement("image");
            imageElement.AppendChild(GenerateElementWithInnerText("url", podcast.ImageUrl));
            imageElement.AppendChild(GenerateElementWithInnerText("title", podcast.Title));
            imageElement.AppendChild(GenerateElementWithInnerText("url", podcast.RootUrl));
            channelElement.AppendChild(imageElement);

            channelElement.AppendChild(GenerateElementWithInnerText("description", podcast.Description));
            channelElement.AppendChild(GenerateElementWithInnerText("language", "en-us"));
            channelElement.AppendChild(GenerateElementWithInnerText("copyright", $"{podcast.Author} copyright 2020"));
            channelElement.AppendChild(GenerateAtomLinkElement(podcast));
            channelElement.AppendChild(GenerateElementWithInnerText("lastBuildDate", DateTime.UtcNow.ToString("R")));

            foreach (var itunesElement in GenerateItunesElements(podcast))
            {
                channelElement.AppendChild(itunesElement);
            }

            foreach (var rawVoiceElement in GenerateRawVoiceElements())
            {
                channelElement.AppendChild(rawVoiceElement);
            }

            channelElement.AppendChild(GenerateElementWithInnerText("pubDate", new DateTime(2020, 1, 5).ToString("R")));
            foreach (var entry in entries)
            {
                channelElement.AppendChild(GenerateItemElement(podcast, entry));
            }

            return channelElement;
        }

        private IEnumerable<XmlElement> GenerateItunesElements(Podcast podcast)
        {
            yield return GenerateElementWithInnerText("itunes:author", podcast.Author);
            yield return GenerateElementWithInnerText("itunes:summary", podcast.Description);
            yield return GenerateElementWithInnerText("itunes:subtitle", string.Empty);

            var ownerElement = Document.CreateElement("itunes", "owner", NamespaceLookup["itunes"]);
            ownerElement.AppendChild(GenerateElementWithInnerText("itunes:name", podcast.Author));
            ownerElement.AppendChild(GenerateElementWithInnerText("itunes:email", ""));
            yield return ownerElement;

            yield return GenerateElementWithInnerText("itunes:explicit", "No");
            yield return GenerateElementWithInnerText("itunes:keywords", "daf yomi, gemara, talmud");

            var imageElement = Document.CreateElement("itunes", "image", NamespaceLookup["itunes"]);
            imageElement.SetAttribute("href", podcast.RootUrl);
            yield return imageElement;

            var categoryElement = Document.CreateElement("itunes", "category", NamespaceLookup["itunes"]);
            categoryElement.SetAttribute("text", "Judaism");
            yield return categoryElement;
        }

        private IEnumerable<XmlElement> GenerateRawVoiceElements()
        {
            yield return GenerateElementWithInnerText("rawvoice:rating", "TV-G");
            yield return GenerateElementWithInnerText("rawvoice:location", "Oak Park, Michigan");
            yield return GenerateElementWithInnerText("rawvoice:frequency", "Daily");
        }

        private XmlElement GenerateAtomLinkElement(Podcast podcast)
        {
            var atomLinkElement = Document.CreateElement("atom", "link", NamespaceLookup["atom"]);
            atomLinkElement.SetAttribute("href", podcast.FeedUrl);
            atomLinkElement.SetAttribute("rel", "self");
            atomLinkElement.SetAttribute("type", "application/rss+xml");
            return atomLinkElement;
        }

        private XmlElement GenerateItemElement(Podcast podcast, Entry entry)
        {
            var entryUrl = entry.Url;
            var itemElement = Document.CreateElement("item");
            itemElement.AppendChild(GenerateElementWithInnerText("title", entry.Title));
            itemElement.AppendChild(GenerateElementWithInnerText("link", entryUrl));
            itemElement.AppendChild(GenerateElementWithInnerText("pubDate", entry.PublishedOn.ToString("R")));
            itemElement.AppendChild(GenerateElementWithInnerText("description", entry.Description));

            var enclosureElement = Document.CreateElement("enclosure");
            enclosureElement.SetAttribute("url", entryUrl);
            enclosureElement.SetAttribute("length", entry.SizeInBytes.ToString(CultureInfo.InvariantCulture));
            enclosureElement.SetAttribute("type", "audio/mpeg");
            itemElement.AppendChild(enclosureElement);

            itemElement.AppendChild(GenerateElementWithInnerText("guid", entryUrl));
            itemElement.AppendChild(GenerateElementWithInnerText("itunes:duration", entry.Duration));
            itemElement.AppendChild(GenerateElementWithInnerText("itunes:summary", entry.Description));

            var imageElement = Document.CreateElement("itunes", "image", NamespaceLookup["itunes"]);
            imageElement.SetAttribute("href", podcast.RootUrl);
            itemElement.AppendChild(imageElement);

            itemElement.AppendChild(GenerateElementWithInnerText("itunes:keywords", "daf yomi, gemara, talmud"));
            itemElement.AppendChild(GenerateElementWithInnerText("itunes:explicit", "No"));

            return itemElement;
        }

        private XmlElement GenerateElementWithInnerText(string elementName, string innerText)
        {
            XmlElement lastBuildDateElement;

            if (elementName.Contains(':'))
            {
                var nameParts = elementName.Split(':');
                lastBuildDateElement = Document.CreateElement(nameParts[0], nameParts[1], NamespaceLookup[nameParts[0]]);
            }
            else
            {
                lastBuildDateElement = Document.CreateElement(elementName);
            }

            lastBuildDateElement.InnerText = innerText;
            return lastBuildDateElement;
        }
    }
}
