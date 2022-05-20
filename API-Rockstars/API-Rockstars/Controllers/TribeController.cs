#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Rockstars.Azure;
using API_Rockstars.Models;
using Microsoft.Graph;

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
        
        //Get all tribes
        // GET: api/Tribe
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AzureTribe>>> GetTribes()
        {
            var groups = await _azure.GraphApi.Groups.Request().GetAsync();

            List<AzureTribe> tribes = new List<AzureTribe>();

            foreach (var group in groups)
            {
                tribes.Add(new AzureTribe
                {
                    id = Guid.Parse(group.Id),
                    displayName = group.DisplayName,
                    description = group.Description
                });
            }

            return tribes;
        }

        //Get a tribe by id
        // GET: api/Tribe/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AzureTribe>> GetTribe(Guid id)
        {
            var group = await _azure.GraphApi.Groups[id.ToString()].Request().GetAsync();

            AzureTribe tribe = new AzureTribe
            {
                id = Guid.Parse(group.Id),
                displayName = group.DisplayName,
                description = group.Description
            };

            return tribe;
        }
        
        //Get all rockstars in tribe by id
        // GET: api/Tribe/5
        [HttpGet("GetAllRockstars/{id}")]
        public async Task<ActionResult<List<AzureRockstar>>> GetRockstarsByTribe(Guid id)
        {
            if(!await TribeExists(id))
            {
                return BadRequest("No tribe with given ID");
            }

            var members = await _azure.GraphApi.Groups[id.ToString()].Members.Request().GetAsync();

            var rockstars = new List<AzureRockstar>();
            
            //Make list of all members with props
            foreach (var member in members)
            {
                var rockstarData = await _azure.GraphApi.Users[member.Id].Request().GetAsync();
                
                rockstars.Add(new AzureRockstar
                {
                    id = rockstarData.Id,
                    displayName = rockstarData.DisplayName,
                    userPrincipalName = rockstarData.UserPrincipalName,
                });
            }

            //Get role per rockstar in list
            foreach (var rockstar in rockstars)
            {
                var rockstarRole =
                    await _context.RockstarRoles.FirstOrDefaultAsync(x => x.TribeId == id && x.RockstarId.ToString() == rockstar.id);

                if (rockstarRole == null)
                {
                    rockstar.role = "Rockstar";
                }
                else
                {
                    var role = await _context.Roles.FindAsync(rockstarRole.RoleId);
                    rockstar.role = role != null ? role.Name : "Rockstar";
                }
                
            }

            return rockstars;
        }

        //Add rockstar to tribe
        [HttpPost("AddRockstar")]
        public async Task<ActionResult> AddRockstartToTribe(TribeRockstar tribeRockstar)
        {
            var directoryObject = new DirectoryObject
            {
                Id = tribeRockstar.RockstarId.ToString()
            };
            
            await _azure.GraphApi.Groups[tribeRockstar.TribeId.ToString()].Members.References.Request().AddAsync(directoryObject);

            return Ok();
        }

        //Create tribe
        // POST: api/Tribe
        [HttpPost]
        public async Task<ActionResult<AzureTribe>> PostTribe(AzureTribe tribe)
        {
            var group = new Group
            {
                Description = tribe.description,
                DisplayName = tribe.displayName,
                MailEnabled = false,
                MailNickname = tribe.displayName,
                SecurityEnabled = true,
            };

            await _azure.GraphApi.Groups.Request().AddAsync(group);

            return Ok();
        }

        //Update tribe
        // PUT: api/Tribe
        [HttpPut]
        public async Task<IActionResult> PutTribe(AzureTribe tribe)
        {
            if (tribe.id == null)
            {
                return BadRequest();
            }

            var group = new Group
            {
                Description = tribe.description,
                DisplayName = tribe.displayName,
                MailEnabled = false,
                MailNickname = tribe.displayName,
                SecurityEnabled = true,
            };

            if (!await TribeExists(tribe.id ?? default))
            {
                return NotFound();
            }

            await _azure.GraphApi.Groups[tribe.id.ToString()].Request().UpdateAsync(group);

            return Ok();
        }

        //Delete tribe
        // DELETE: api/Tribe/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTribe(Guid id)
        {
            if (!await TribeExists(id))
            {
                return NotFound();
            }
            await _azure.GraphApi.Groups[id.ToString()]
                .Request()
                .DeleteAsync();

            return Ok();
        }

        //Check if tribe exists
        private async Task<bool> TribeExists(Guid id)
        {
            var group = await _azure.GraphApi.Groups[id.ToString()].Request().GetAsync();
            return group != null;
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
            if (! await TribeExists(tribeSpotify.TribeId))
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
