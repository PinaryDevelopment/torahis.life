namespace Data
{
    public class MasechtaMetadata
    {
        public string Seder { get; set; }
        public string Title { get; set; }
        public int DafimInMasechta { get; set; }

        public MasechtaMetadata(string seder, string title, int dafimInMasechta)
        {
            Seder = seder;
            Title = title;
            DafimInMasechta = dafimInMasechta;
        }
    }
}
