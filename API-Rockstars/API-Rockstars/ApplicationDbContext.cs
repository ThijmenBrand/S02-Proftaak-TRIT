using API_Rockstars.Models;
using Microsoft.EntityFrameworkCore;

namespace API_Rockstars;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    
    public DbSet<TribeSpotify> TribeSpotify { get; set; }

    public DbSet<Role> Roles { get; set; }
    public DbSet<RockstarRole> RockstarRoles { get; set; }
    public DbSet<Article> Articles { get; set; }
    public DbSet<ArticleView> ArticleViews { get; set; }
    public DbSet<Comment> Comment { get; set; }
    public DbSet<ArticleLike> ArticleLike { get; set; }
    public DbSet<RockstarSocial> RockstarSocials { get; set; }
}