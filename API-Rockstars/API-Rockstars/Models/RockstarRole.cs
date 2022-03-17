using System.ComponentModel.DataAnnotations;

namespace API_Rockstars.Models;

public class RockstarRole
{
    [Key] public Guid Id { get; set; }
    [Required] public Guid RockstarId { get; set; }
    [Required] public Guid RoleId { get; set; }
    [Required] public Guid TribeId { get; set; }
}