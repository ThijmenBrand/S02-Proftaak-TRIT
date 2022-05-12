#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Rockstars;
using API_Rockstars.Models;
using API_Rockstars.Azure;

namespace API_Rockstars.Controllers
{
    [Route("api/rockstar")]
    [ApiController]
    public class RockstarController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RockstarController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Rockstar
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AzureRockstar>>> GetRockstars()
        {
            AzureRequestMiddleware<AzureRockstar> apireq = new AzureRequestMiddleware<AzureRockstar>();
            List<AzureRockstar> res = await apireq.sendAzureRequest("v1.0/users");
            return res;
        }

        // GET: api/Rockstar/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rockstar>> GetRockstar(Guid id)
        {
            var rockstar = await _context.Rockstars.FindAsync(id);

            if (rockstar == null)
            {
                return NotFound();
            }

            return rockstar;
        }

        [HttpPost("AddRollToRockstar")]
        public async Task<ActionResult<Rockstar>> AddRoleToRockstar(RockstarRole rockstarRole)
        {
            RockstarRole checkDuplicate = _context.RockstarRoles.FirstOrDefault(x =>
                x.TribeId == rockstarRole.TribeId && x.RoleId == rockstarRole.RoleId &&
                x.RockstarId == rockstarRole.RockstarId);

            if (checkDuplicate != null)
            {
                return BadRequest("This rockstar is already assigned to this role in this Tribe");
            }

            _context.RockstarRoles.Add(rockstarRole);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // PUT: api/Rockstar/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRockstar(Guid id, Rockstar rockstar)
        {
            if (id != rockstar.Id)
            {
                return BadRequest();
            }

            _context.Entry(rockstar).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RockstarExists(id))
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

        // POST: api/Rockstar
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Rockstar>> PostRockstar(Rockstar rockstar)
        {
            _context.Rockstars.Add(rockstar);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRockstar", new {id = rockstar.Id}, rockstar);
        }

        // DELETE: api/Rockstar/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRockstar(Guid id)
        {
            var rockstar = await _context.Rockstars.FindAsync(id);
            if (rockstar == null)
            {
                return NotFound();
            }

            _context.Rockstars.Remove(rockstar);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("GetRockstarRole/TribeId/{tribeId}/RockstarId/{rockstarId}")]
        public async Task<ActionResult<Role>> GetRockstarsRoleByTribeId(Guid tribeId, Guid rockstarId)
        {
            RockstarRole rockstarRole = await _context.RockstarRoles.FirstOrDefaultAsync(x => x.TribeId == tribeId && x.RockstarId == rockstarId);

            if (rockstarRole == null)
            {
                return NotFound();
            }

            Role role = await _context.Roles.FindAsync(rockstarRole.RoleId);

            if (role == null)
            {
                return NotFound();
            }

            return role;
        }

        private bool RockstarExists(Guid id)
        {
            return _context.Rockstars.Any(e => e.Id == id);
        }
    }
}