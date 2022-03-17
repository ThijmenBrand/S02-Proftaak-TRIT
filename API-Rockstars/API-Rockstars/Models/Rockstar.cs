using System;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;
using Newtonsoft.Json.Converters;

namespace API_Rockstars.Models
{
    public class Rockstar
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }

        public byte[]? Image { get; set; }

        public string? Description { get; set; }
    }
}