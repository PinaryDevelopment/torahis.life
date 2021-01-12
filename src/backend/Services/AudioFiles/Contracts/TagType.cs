namespace PinaryDevelopment.TorahIsLife.AudioFiles.Contracts
{
    public class TagType
    {
        public string Id { get; set; }


        public static string SeriesTitle = "SeriesTitle";           /* e.g. Daf Yomi */
        public static string SeferSeriesTitle = "SeferSeriesTitle"; /* e.g. Talmud Bavli/Yerushalmi/Mishnayos */
        public static string SeferTitle = "SeferTitle";             /* e.g. Berachos/Shabbos/Eruvin */
        public static string Subtitle = "Subtitle";                 /* e.g. with Rashi */
        public static string Metadata = "Metadata";                 /* e.g. olam haba, lechi, etc */
    }
}
