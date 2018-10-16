using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NgContacts.Core.Models
{
    /// <summary>
    /// Represents an individual Contact
    /// </summary>
    public class Contact
    {
        public int Id { get; set; }

        // Personal information
        public string FirstName { get; set; }
        public string LastName { get; set; }

        // Contact information
        public string EmailAddress { get; set; }
        public string Phone { get; set; }
        public string DOB { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }

        // Employment information
        public string Company { get; set; }
        public string JobTitle { get; set; }


       

    }
}
