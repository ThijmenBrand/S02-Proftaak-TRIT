#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Rockstars;
using API_Rockstars.Models;

namespace API_Rockstars.Controllers
{
    [Route("api/tribe")]
    [ApiController]
    public class TribeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TribeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Tribe
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tribe>>> GetTribes()
        {
            return await _context.Tribes.ToListAsync();
        }

        // GET: api/Tribe/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tribe>> GetTribe(Guid id)
        {
            var tribe = await _context.Tribes.FindAsync(id);

            if (tribe == null)
            {
                return NotFound();
            }

            return tribe;
        }
        
        // GET: api/Tribe/5
        [HttpGet("GetAllRockstars/{id}")]
        public async Task<ActionResult<List<Rockstar>>> GetRockstarsByTribe(Guid id)
        {
            var tribe = await _context.Tribes.FindAsync(id);

            if (tribe == null)
            {
                return NoContent();
            }
            
            Task<List<TribeRockstar>> tribeRockstars = _context.TribeRockstars.Where(x => x.TribeId == id).ToListAsync();

            if (tribeRockstars.Result.Count == 0)
            {
                return NoContent();
            }

            List<Rockstar> rockstars = new List<Rockstar>();

            foreach (var rockstar in tribeRockstars.Result)
            {
                rockstars.Add(await _context.Rockstars.FindAsync(rockstar.RockstarId));
            }

            if (rockstars.Count == 0)
            {
                return NoContent();
            }

            foreach (var rockstar in rockstars)
            {
                RockstarRole rockstarRole = await _context.RockstarRoles.FirstOrDefaultAsync(x => x.TribeId == id && x.RockstarId == rockstar.Id);

                if (rockstarRole != null)
                {
                    Role role = await _context.Roles.FindAsync(rockstarRole.RoleId);
                    rockstar.Role = role.Name;
                }
            }

            return rockstars;
        }

        [HttpPost("AddRockstar")]
        public async Task<ActionResult<Tribe>> AddRockstartToTribe(TribeRockstar tribeRockstar)
        {
            TribeRockstar checkDuplicate = _context.TribeRockstars.FirstOrDefault(x =>
                x.RockstarId == tribeRockstar.RockstarId && x.TribeId == tribeRockstar.TribeId);

            if (checkDuplicate != null)
            {
                return BadRequest("Rockstar already in tribe!");
            }
            
            _context.TribeRockstars.Add(tribeRockstar);
            await _context.SaveChangesAsync();
            
            return Ok();
        }
        
        // PUT: api/Tribe/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTribe(Guid id, Tribe tribe)
        {
            if (id != tribe.Id)
            {
                return BadRequest();
            }

            _context.Entry(tribe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TribeExists(id))
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

        // POST: api/Tribe
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tribe>> PostTribe(Tribe tribe)
        {
            _context.Tribes.Add(tribe);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTribe", new { id = tribe.Id }, tribe);
        }

        // DELETE: api/Tribe/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTribe(Guid id)
        {
            var tribe = await _context.Tribes.FindAsync(id);
            if (tribe == null)
            {
                return NotFound();
            }

            _context.Tribes.Remove(tribe);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TribeExists(Guid id)
        {
            return _context.Tribes.Any(e => e.Id == id);
        }
        
        //Spotify calls in tribe
        
        [HttpGet("spotify/{id}")]
        public async Task<ActionResult<TribeSpotify>> GetTribeSpotify(Guid id)
        {
            var tribeSpotify = await _context.TribeSpotify.FindAsync(id);

            if (tribeSpotify == null)
            {
                return NoContent();
            }

            return tribeSpotify;
        }
        
        [HttpGet("{id}/spotify")]
        public async Task<ActionResult<List<TribeSpotify>>> GetSpotifyByTribeId(Guid id)
        {
            List<TribeSpotify> tribeSpotifies = await _context.TribeSpotify.Where(x => x.TribeId == id).ToListAsync();

            if (!tribeSpotifies.Any())
            {
                return NoContent();
            }

            return tribeSpotifies;
        }
        
        [HttpPost("spotify")]
        public async Task<IActionResult> AddSpotifyToTribe(TribeSpotify tribeSpotify)
        {
            if (!TribeExists(tribeSpotify.TribeId))
            {
                return BadRequest("Tribe does not exists");
            }
            
            _context.TribeSpotify.Add(tribeSpotify);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTribeSpotify", new { id = tribeSpotify.Id }, tribeSpotify);
        }
        
        // DELETE: api/Tribe/id/spotify
        [HttpDelete("spotify/{id}")]
        public async Task<IActionResult> DeleteSpotifyFromTribe(Guid id)
        {
            var tribeSpotify = await _context.TribeSpotify.FindAsync(id);
            if (tribeSpotify == null)
            {
                return NoContent();
            }

            _context.TribeSpotify.Remove(tribeSpotify);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
