using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BeamAPI.Models
{
    public class BeamType
    {
        [Key]
        public int BeamTypeId { get; set; }
        public int BeamId { get; set; }
        // FK
        public Beam Beam { get; set; }
        public int TypeId { get; set; }
        // FK
        public Type Type { get; set; }
    }
}
