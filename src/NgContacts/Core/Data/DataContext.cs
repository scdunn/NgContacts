using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NgContacts.Core.Models;

namespace NgContacts.Core.Data
{
    public class DataContext: DbContext
    {
        private ILogger _logger;

        public DbSet<Contact> Contacts { get; set; }

        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="options"></param>
        /// <param name="logger"></param>
        public DataContext(DbContextOptions<DataContext> options, ILogger<DataContext> logger):base(options)
        { _logger = logger;  }

        /// <summary>
        /// Initialize database and recreate and seed data.
        /// </summary>
        /// <param name="filename"></param>
        /// <param name="recreate"></param>
        public void SetupDatabase(string filename, bool recreate = false)
        {

            try
            {

            // Recreate database.  For development purposes only.
            if(recreate)
                if(this.Database.EnsureDeleted())
                    _logger.LogInformation("Database deleted.");

            if(this.Database.EnsureCreated())
                    _logger.LogInformation("Database created.");

            // Seed data from json file
            if (recreate)
            {

                _logger.LogInformation("Loading {filename} and adding contacts.", filename);

                var json = System.IO.File.ReadAllText(filename);
                var jsonContacts = Newtonsoft.Json.JsonConvert.DeserializeObject<Contact[]>(json);

                Contacts.AddRange(jsonContacts);

                SaveChanges();
            }
            }catch(Exception ex)
            {
                _logger.LogWarning(ex.Message);

            }
        }
    }
}
