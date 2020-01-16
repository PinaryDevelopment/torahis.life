using System;
using System.Collections.Generic;
using System.Text;

namespace Data
{
    public class AuthorMetadata
    {
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ShiurMetadata[] Shiurim { get; set; }
        public string Fullname => $"{Title} {FirstName} {LastName}";

        public AuthorMetadata(string title, string firstName, string lastName)
        {
            Title = title;
            FirstName = firstName;
            LastName = lastName;
        }
    }
}
