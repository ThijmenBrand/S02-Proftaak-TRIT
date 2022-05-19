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
using API_Rockstars.Azure;
using API_Rockstars.Models;

namespace API_Rockstars.Controllers
{
    [Route("api/tribe")]
    [ApiController]
    public class TribeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly AzureConfiguration _azure;

        public TribeController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _azure = new AzureConfiguration(configuration);
        }

        // GET: api/Tribe
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AzureTribe>>> GetTribes()
        {
            var groups = await _azure.GraphApi.Groups.GetAsync();

            List<AzureTribe> tribes = new List<AzureTribe>();

            foreach (var group in groups.Value)
            {
                tribes.Add(new AzureTribe
                {
                    id = group.Id,
                    displayName = group.DisplayName,
                    description = group.Description
                });
            }

            return tribes;
        }

        // GET: api/Tribe/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AzureTribe>> GetTribe(Guid id)
        {
            var group = await _azure.GraphApi.Groups[id.ToString()].GetAsync();

            AzureTribe tribe = new AzureTribe
            {
                id = group.Id,
                displayName = group.DisplayName,
                description = group.Description
            };

            return tribe;
        }
        
        // GET: api/Tribe/5
        [HttpGet("GetAllRockstars/{id}")]
        public async Task<ActionResult<List<AzureRockstar>>> GetRockstarsByTribe(Guid id)
        {
            var members = await _azure.GraphApi.Groups[id.ToString()].Members.GetAsync();

            List<AzureRockstar> rockstars = new List<AzureRockstar>();

            foreach (var member in members.Value)
            {
                var rockstarData = await _azure.GraphApi.Users[member.Id].GetAsync();
                
                RockstarRole rockstarRole = await _context.RockstarRoles.FirstOrDefaultAsync(x => x.TribeId == id && x.RockstarId.ToString() == rockstarData.Id);

                if (rockstarRole != null)
                {
                    Role role = await _context.Roles.FindAsync(rockstarRole.Id);
                    if (role != null)
                    {
                        rockstars.Add(new AzureRockstar
                        {
                            id = rockstarData.Id,
                            displayName = rockstarData.DisplayName,
                            userPrincipalName = rockstarData.UserPrincipalName,
                            role = role.Name
                        });
                    }
                    else
                    {
                        rockstars.Add(new AzureRockstar
                        {
                            id = rockstarData.Id,
                            displayName = rockstarData.DisplayName,
                            userPrincipalName = rockstarData.UserPrincipalName,
                            role = "Rockstar"
                        });
                    }

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
