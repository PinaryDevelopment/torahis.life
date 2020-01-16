using System;

namespace Data
{
    public class ShiurMetadata
    {
        public string Title { get; set; }
        public string Subtitle { get; set; }

        public ShiurMetadata(string[] groups, string title, string subtitle, string version)
        {
            if (groups == null || groups.Length < 1) throw new ArgumentNullException();

            Groups = groups;
            Title = title;
            Subtitle = subtitle;
            Version = version;
        }

        public string[] Groups { get; set; }
        public string Version { get; set; }
    }
}
