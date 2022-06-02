using System.ComponentModel.DataAnnotations;

namespace API_Rockstars.Models
{
    public class ArticleLike
    {
        [Key] public Guid Id { get; set; }
        public string FrontendUserId { get; set; }
        public Guid ArticleId { get; set; }
    }
}
