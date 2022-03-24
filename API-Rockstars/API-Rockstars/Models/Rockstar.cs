using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;
using Newtonsoft.Json.Converters;

namespace API_Rockstars.Models
{
    public class Rockstar
    {
        [Key] public Guid Id { get; set; }
        [Required] public string Name { get; set; }
        [Column(TypeName = "varchar(MAX)")] public string? Image { get; set; }
        public string? Description { get; set; }
        [NotMapped] public string? Role { get; set; }
    }
}