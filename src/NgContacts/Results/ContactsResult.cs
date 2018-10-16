using NgContacts.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NgContacts.Results
{
    /// <summary>
    /// Represents a result model for contacts search
    /// </summary>
    public class ContactsResult
    {
        // All contacts from for result
        public IEnumerable<Contact> Contacts { get; set; }

        // Total number of contacts in result
        public int TotalCount { get; set; }

        // Number of pages
        public int PageCount { get; set; }
    }
}
