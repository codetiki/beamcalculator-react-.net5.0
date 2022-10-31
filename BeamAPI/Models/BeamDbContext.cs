using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeamAPI.Models
{
    public class BeamDbContext : DbContext
    {
        public BeamDbContext(DbContextOptions<BeamDbContext> options):base(options)
        {
            
        }
        public DbSet<Beam> Beams { get; set; }
        public DbSet<Type> Types { get; set; }
        public DbSet<BeamType> BeamTypes { get; set; }

    }
}
