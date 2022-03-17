using System;
using System.ComponentModel.DataAnnotations;


namespace API_Rockstars.Models
{
    public class TribeRockstar
    {
        [Key] public Guid Id { get; set; }
        [Required] public Guid TribeId { get; set; }
        [Required] public Guid RockstarId { get; set; }
        

    }
}