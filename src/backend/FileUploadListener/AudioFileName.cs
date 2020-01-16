using System;
using System.Globalization;
using System.IO;

namespace FileUploadListener
{
    public class AudioFileName
    {
        public string Masechta { get; }
        public string Daf { get; }
        public DateTime RecordedOn { get; set; }
        public string Subtitle { get; set; }

        public AudioFileName(string fileName)
        {
            var pathParts = fileName.Split(new[] { Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar });

            Masechta = pathParts[^2];
            fileName = Path.GetFileNameWithoutExtension(pathParts[^1]);
            var nameParts = fileName.Split('-', StringSplitOptions.RemoveEmptyEntries);
            Daf = nameParts[0].Split(' ')[1];
            Subtitle = nameParts[1];
            RecordedOn = DateTime.ParseExact(nameParts[2], "yyyy.MM.dd", CultureInfo.CurrentCulture);
        }
    }
}
