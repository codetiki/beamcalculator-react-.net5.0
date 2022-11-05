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
        [Column(TypeName = "nvarchar(200)")]
        public string BeamName { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string BeamDefinition { get; set; }

        public decimal Span { get; set; }
        public decimal A { get; set; }
        public decimal B { get; set; }
        public decimal Vmax { get; set; }
        public decimal Vmin { get; set; }
        public decimal Mmax { get; set; }
        public decimal Mmin { get; set; }


        public List<Type> Types { get; set; }

    }
}
