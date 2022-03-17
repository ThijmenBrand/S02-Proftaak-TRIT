using System.ComponentModel.DataAnnotations;

namespace API_Rockstars.Models;

public class Article
{
    public Guid Id { get; set; }
    [Required]
    public Guid TribeId { get; set; }
    [Required]
    public Guid RockstarId { get; set; }
    [Required] 
    public string Title { get; set; }
    [Required]
    public string Content { get; set; }
}