using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace API_Rockstars.Models;

public class Comment
{
    [Key] public Guid Id { get; set; }
    public Guid ArticleId { get; set; }
    public string UserId { get; set; }
    public string UserName { get; set; }
    public string CommentText { get; set; }
    [DefaultValue(false)] public bool Approved { get; set; }
    public DateTime CommentDate { get; set; }
}