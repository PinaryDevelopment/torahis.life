namespace FileUploadListener
{
    public static class StringExtensions
    {
        public static string ToUppercaseWords(this string value)
        {
            char[] array = value.ToCharArray();
            if (array.Length >= 1 && char.IsLower(array[0]))
            {
                array[0] = char.ToUpper(array[0]);
            }

            for (int i = 1; i < array.Length; i++)
            {
                if (array[i - 1] == ' ')
                {
                    if (char.IsLower(array[i]))
                    {
                        array[i] = char.ToUpper(array[i]);
                    }
                }
            }

            return new string(array);
        }

        public static string ToUrlWords(this string value)
        {
            char[] array = value.ToCharArray();

            for (int i = 0; i < array.Length; i++)
            {
                if (char.IsUpper(array[i]))
                {
                    array[i] = char.ToLower(array[i]);
                }

                if (array[i] == ' ')
                {
                    array[i] = '-';
                }
            }

            return new string(array);
        }
    }
}
