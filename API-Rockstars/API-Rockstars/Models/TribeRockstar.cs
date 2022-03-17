using System;
using System.ComponentModel.DataAnnotations;


namespace API_Rockstars.Models
{
    public class TribeRockstar
    {
        [Key]
        public Guid Id { get; set; }
        
            public Guid TribeId { get; set; }
            
            public Guid RockstarId { get; set; }

    }
}