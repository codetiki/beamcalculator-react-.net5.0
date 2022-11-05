using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BeamAPI.Models;

namespace BeamAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForceTypeController : ControllerBase
    {
        private readonly BeamDbContext _context;

        public ForceTypeController(BeamDbContext context)
        {
            _context = context;
        }

        // GET: api/ForceType
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ForceType>>> GetForceTypes()
        {
            return await _context.ForceTypes.ToListAsync();
        }

        // GET: api/ForceType/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ForceType>> GetForceType(int id)
        {
            var forceType = await _context.ForceTypes.FindAsync(id);

            if (forceType == null)
            {
                return NotFound();
            }

            return forceType;
        }

        // PUT: api/ForceType/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutForceType(int id, ForceType forceType)
        {
            if (id != forceType.ForceTypeId)
            {
                return BadRequest();
            }

            _context.Entry(forceType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ForceTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ForceType
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ForceType>> PostForceType(ForceType forceType)
        {
            _context.ForceTypes.Add(forceType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetForceType", new { id = forceType.ForceTypeId }, forceType);
        }

        // DELETE: api/ForceType/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteForceType(int id)
        {
            var forceType = await _context.ForceTypes.FindAsync(id);
            if (forceType == null)
            {
                return NotFound();
            }

            _context.ForceTypes.Remove(forceType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ForceTypeExists(int id)
        {
            return _context.ForceTypes.Any(e => e.ForceTypeId == id);
        }
    }
}
