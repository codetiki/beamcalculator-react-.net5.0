using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BeamAPI.Models
{
    public class ForceType
    {
        [Key]
        public int ForceTypeId { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string ForceTypeName { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string ForceTypeDefinition { get; set; }
    }
}
