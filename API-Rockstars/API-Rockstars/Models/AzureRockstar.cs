using System.ComponentModel.DataAnnotations.Schema;

namespace API_Rockstars.Models
{
    public class AzureRockstar
    {
        public string id { get; set; }
        public string userPrincipalName { get; set; }
        public string displayName { get; set; }
        public string? role { get; set; }
        [NotMapped] public RockstarSocial? RockstarSocial { get; set; }
    }
}