using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API_Rockstars.Models;

public class Article
{
    [Key] public Guid Id { get; set; }
    [Required] public Guid TribeId { get; set; }
    [Required] public Guid RockstarId { get; set; }
    public string? Thumbnail { get; set; }
    [Required] public string Title { get; set; }
    [Required] public string Content { get; set; }
    [NotMapped] public string? TribeName { get; set; }
    [NotMapped] public string? RockstarName { get; set; }
    [DefaultValue(0)] public int ViewCount { get; set; }
    public DateTime PublishDate { get; set; }
}