using System.ComponentModel.DataAnnotations;

namespace API_Rockstars.Models;

public class TribeSpotify
{
    [Key] public Guid Id { get; set; }
    [Required] public Guid TribeId { get; set; }
    [Required] public string SpotifyLink { get; set; }
}