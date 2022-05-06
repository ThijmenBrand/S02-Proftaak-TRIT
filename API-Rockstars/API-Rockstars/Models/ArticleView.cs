using System.ComponentModel.DataAnnotations;

namespace API_Rockstars.Models;

public class ArticleView
{
    [Key] public Guid  Id { get; set; }
    public string FrontendUserId { get; set; }
    public Guid ArticleId { get; set; }
}