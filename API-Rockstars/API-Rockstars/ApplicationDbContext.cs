using API_Rockstars.Models;
using Microsoft.EntityFrameworkCore;

namespace API_Rockstars;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Tribe> Tribes { get; set; }
    public DbSet<Rockstar> Rockstars { get; set; }
    public DbSet<TribeRockstar> TribeRockstars { get; set; }
    public DbSet<TribeSpotify> TribeSpotify { get; set; }

    public DbSet<Role> Roles { get; set; }
    public DbSet<RockstarRole> RockstarRoles { get; set; }
    public DbSet<Article> Articles { get; set; }
    public DbSet<ArticleView> ArticleViews { get; set; }
    public DbSet<API_Rockstars.Models.Comment> Comment { get; set; }
}