using System;
using System.Collections.Generic;
using System.Text;

namespace FileUploadListener
{
    public class PodcastMetadata
    {
        public string Author { get; set; }          // Rabbi Yosef Bromberg
        public string Title { get; set; }           // "Daf Yomi with Rabbi Yosef Bromberg - Full"
        public string Description { get; set; }     // "A daf yomi shiur given by Rabbi Yosef Bromberg. This version includes the daf and Rashi."
        public string RootUrl { get; set; }         // "https://www.torahis.life/daf-yomi/rabbi-yosef-bromberg/full"
        public string ImageUrl => $"{RootUrl}/podcast3000x3000.png";
        public string FeedUrl => $"{RootUrl}/podcast.xml";
    }
}
