using System;
using System.ComponentModel.DataAnnotations;

namespace API_Rockstars.Models;

public class Tribe
{
    [Key] public Guid Id { get; set; }
    [Required] public string Name { get; set; }
}