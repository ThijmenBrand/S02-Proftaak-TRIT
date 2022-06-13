namespace API_Rockstars.Models;

public class RockstarSocial
{
    public Guid Id { get; set; }
    public Guid RockstarId { get; set; }
    public string? TwitterLink { get; set; }
    public string? LinkedInLink { get; set; }
    public string? FacebookLink { get; set; }
}