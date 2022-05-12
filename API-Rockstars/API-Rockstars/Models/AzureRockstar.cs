using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;
using Newtonsoft.Json.Converters;

namespace API_Rockstars.Models
{
    public class AzureRockstar
    {
        public Guid id { get; set; }
        public string userPrincipalName { get; set; }
        public string displayName { get; set; }
    }
}