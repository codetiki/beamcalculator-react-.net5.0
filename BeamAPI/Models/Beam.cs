using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BeamAPI.Models
{
    public class Beam
    {
        [Key]
        public int BeamId { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string BeamName { get; set; }

        public decimal Span { get; set; }
        public decimal A { get; set; }
        public decimal B { get; set; }

        public ICollection<Type> Types { get; set; }
        public List<BeamType> BeamTypes { get; set; }

    }
}
