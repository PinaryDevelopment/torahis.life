using System;
using System.Linq;

namespace Data
{
    public static class StaticData
    {
        public const string ShiurimContainerName = "shiurim";
        public const string UploadedFileRootContainerPath = "src";

        public static readonly DateTime DafYomiCycleStartDate = new DateTime(2020, 1, 5);

        public static readonly MasechtaMetadata[] Masechtos = new[]
        {
            new MasechtaMetadata("Zeraim", "Berachos", 63),
            new MasechtaMetadata("Zeraim", "Peah", 0),
            new MasechtaMetadata("Zeraim", "Demai", 0),
            new MasechtaMetadata("Zeraim", "Kilayim", 0),
            new MasechtaMetadata("Zeraim", "Sheviis", 0),
            new MasechtaMetadata("Zeraim", "Terumos", 0),
            new MasechtaMetadata("Zeraim", "Maaseros", 0),
            new MasechtaMetadata("Zeraim", "Maaser Sheni", 0),
            new MasechtaMetadata("Zeraim", "Challah", 0),
            new MasechtaMetadata("Zeraim", "Orlah", 0),
            new MasechtaMetadata("Zeraim", "Bikkurim", 0),

            new MasechtaMetadata("Moed", "Shabbos", 156),
            new MasechtaMetadata("Moed", "Eruvin", 104),
            new MasechtaMetadata("Moed", "Pesachim", 120),
            new MasechtaMetadata("Moed", "Shekalim", 21),
            new MasechtaMetadata("Moed", "Yoma", 87),
            new MasechtaMetadata("Moed", "Sukkah", 55),
            new MasechtaMetadata("Moed", "Beitzah", 39),
            new MasechtaMetadata("Moed", "Rosh Hashanah", 34),
            new MasechtaMetadata("Moed", "Taanis", 30),
            new MasechtaMetadata("Moed", "Megilah", 31),
            new MasechtaMetadata("Moed", "Moed Katan", 28),
            new MasechtaMetadata("Moed", "Chagigah", 26),

            new MasechtaMetadata("Nashim", "Yevamos", 121),
            new MasechtaMetadata("Nashim", "Kesubos", 111),
            new MasechtaMetadata("Nashim", "Nedarim", 90),
            new MasechtaMetadata("Nashim", "Nazir", 65),
            new MasechtaMetadata("Nashim", "Sotah", 48),
            new MasechtaMetadata("Nashim", "Gittin", 89),
            new MasechtaMetadata("Nashim", "Kiddushin", 81),

            new MasechtaMetadata("Nezikin", "Bavah Kamah", 118),
            new MasechtaMetadata("Nezikin", "Bavah Meztiah", 118),
            new MasechtaMetadata("Nezikin", "Bavah Basrah", 175),
            new MasechtaMetadata("Nezikin", "Sanhedrin", 112),
            new MasechtaMetadata("Nezikin", "Makkos", 23),
            new MasechtaMetadata("Nezikin", "Shevuos", 48),
            new MasechtaMetadata("Nezikin", "Edios", 0),
            new MasechtaMetadata("Nezikin", "Avodah Zarah", 75),
            new MasechtaMetadata("Nezikin", "Avos", 0),
            new MasechtaMetadata("Nezikin", "Horios", 13),

            new MasechtaMetadata("Kedoshim", "Zevachim", 119),
            new MasechtaMetadata("Kedoshim", "Menachos", 109),
            new MasechtaMetadata("Kedoshim", "Chullin", 141),
            new MasechtaMetadata("Kedoshim", "Bechoros", 60),
            new MasechtaMetadata("Kedoshim", "Arachin", 33),
            new MasechtaMetadata("Kedoshim", "Temurah", 33),
            new MasechtaMetadata("Kedoshim", "Kerisos", 27),
            new MasechtaMetadata("Kedoshim", "Meilah", 21),
            new MasechtaMetadata("Kedoshim", "Tamid", 0),
            new MasechtaMetadata("Kedoshim", "Middos", 0),
            new MasechtaMetadata("Kedoshim", "Kinim", 0),

            new MasechtaMetadata("Tehoros", "Kailim", 0),
            new MasechtaMetadata("Tehoros", "Ohalos", 0),
            new MasechtaMetadata("Tehoros", "Negaim", 0),
            new MasechtaMetadata("Tehoros", "Parah", 0),
            new MasechtaMetadata("Tehoros", "Tehoros", 0),
            new MasechtaMetadata("Tehoros", "Mikvaos", 0),
            new MasechtaMetadata("Tehoros", "Niddah", 72),
            new MasechtaMetadata("Tehoros", "Machshirin", 0),
            new MasechtaMetadata("Tehoros", "Zavim", 0),
            new MasechtaMetadata("Tehoros", "Tevul Yom", 0),
            new MasechtaMetadata("Tehoros", "Yadim", 0),
            new MasechtaMetadata("Tehoros", "Uktzim", 0)
        };

        public static MasechtaMetadata[] Gemaras => Masechtos.Where(m => m.DafimInMasechta > 0).ToArray();

        public static AuthorMetadata[] Authors = new[]
        {
            new AuthorMetadata("Rabbi", "Yosef", "Bromberg")
            {
                Shiurim = Gemaras.SelectMany(g => Enumerable.Range(2, g.DafimInMasechta)
                                                            .SelectMany(d => new[]
                                                            {
                                                                new ShiurMetadata(new[] { "Daf Yomi", g.Title }, d.ToString(), null, "with Rashi"),
                                                                new ShiurMetadata(new[] { "Daf Yomi", g.Title }, d.ToString(), null, "without Rashi")
                                                            })
                                )
                                .ToArray()
            }
        };

        public static (string Masechta, int Daf) CalculateDafForDate(DateTime date)
        {
            var daysFromCycleStart = (date.Date - DafYomiCycleStartDate.Date).TotalDays;
            var masechtaIndex = 0;
            while (daysFromCycleStart >= 0)
            {
                var masechta = Masechtos[masechtaIndex];
                if (masechta.DafimInMasechta > daysFromCycleStart)
                {
                    return (masechta.Title, Convert.ToInt32(daysFromCycleStart) + 2);
                }

                daysFromCycleStart -= masechta.DafimInMasechta;
                masechtaIndex++;

                if (masechtaIndex == Masechtos.Length)
                {
                    masechtaIndex = 0;
                }
            }

            throw new ArgumentOutOfRangeException();
        }
    }
}
