using API_Rockstars.Models;
using Microsoft.EntityFrameworkCore;

namespace API_Rockstars;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Tribe> Tribes { get; set; }
}