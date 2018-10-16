using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NgContacts.Core.Models;
using NgContacts.Core.Data;
using NgContacts.Results;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;

namespace NgContacts.Controllers
{

    /// <summary>
    /// Controller to retrieve, search and update contacts
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : Controller
    {
        private DataContext _dataContext;
        private ILogger _logger;

        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="dataContext"></param>
        /// <param name="logger"></param>
        public ContactsController(DataContext dataContext, ILogger<ContactsController> logger)
        {
            _dataContext = dataContext;
            _logger = logger;
        }
        
        /// <summary>
        /// Update a contact
        /// </summary>
        /// <param name="contact"></param>
        /// <returns></returns>
        [HttpPut]
        public IActionResult Put(Contact contact)
        {
            _dataContext.Contacts.Update(contact);
            _dataContext.SaveChanges();

            _logger.LogInformation("Contact updated");

            return Ok();
        }

        /// <summary>
        /// Returns Json result of ContactsResult model with individual contacts and summary information
        /// </summary>
        /// <param name="query"></param>
        /// <param name="count"></param>
        /// <param name="page"></param>
        /// <returns></returns>
        [HttpGet("{query?}")]
        public ContactsResult Get(string query, [FromQuery] int? count, [FromQuery] int? page)
        {

            ContactsResult contactsResult = new ContactsResult();
            
            int toTake = count ?? 10;
            int toPage = page ?? 1;

            IEnumerable<Contact> result;

            // when no query return all contacts, otherwise filter by querystring on firstname and lastname
            if (!string.IsNullOrEmpty(query))
            {
                query = query.ToLower();
                result = _dataContext.Contacts.Where(m => m.LastName.ToLower().Contains(query) || m.FirstName.ToLower().Contains(query));
            }
            else
                result = _dataContext.Contacts;

            // assign paging, total items in list and paged results from query or all
            contactsResult.TotalCount = result.Count();
            contactsResult.PageCount = Convert.ToInt32(Math.Ceiling(Convert.ToDecimal(contactsResult.TotalCount) / Convert.ToDecimal(toTake)));
            contactsResult.Contacts = result.Skip(toTake * (toPage-1)).Take(toTake);

            _logger.LogInformation("Retrieved contacts: {query}", query);


            return contactsResult;
        }
        
    }
}
