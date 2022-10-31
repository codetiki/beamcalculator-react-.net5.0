using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BeamAPI.Models
{
    public class Type
    {
        [Key]
        public int TypeId { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string ForceType { get; set; }

        public decimal Xp { get; set; }
        public decimal Fy { get; set; }
        public decimal Xm { get; set; }
        public decimal M { get; set; }
        public decimal XStartUDL { get; set; }
        public decimal XEndUDL { get; set; }
        public decimal FyUDL { get; set; }
        public decimal XStartLDL { get; set; }
        public decimal XEndLDL { get; set; }
        public decimal Fy_StartLDL { get; set; }
        public decimal Fy_EndLDL { get; set; }

        public ICollection<Beam> Beams { get; set; }
        public List<BeamType> BeamTypes { get; set; }

    }
}
