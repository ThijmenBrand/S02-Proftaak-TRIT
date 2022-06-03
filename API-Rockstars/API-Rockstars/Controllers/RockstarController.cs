#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Rockstars.Models;
using API_Rockstars.Azure;
using Azure;
using Azure.Communication.Email;
using Azure.Communication.Email.Models;

namespace API_Rockstars.Controllers
{
    [Route("api/rockstar")]
    [ApiController]
    public class RockstarController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly AzureConfiguration _azure;
        private IConfiguration _configuration;

        public RockstarController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _azure = new(configuration);
            _configuration = configuration;
        }

        // GET: api/Rockstar
        [HttpGet]
        public async Task<ActionResult<List<AzureRockstar>>> GetRockstars()
        {
            var apiRes = await _azure.GraphApi.Users.Request().GetAsync();
            List<AzureRockstar> azureRockstars = new List<AzureRockstar>();

            foreach (var user in apiRes)
            {
                azureRockstars.Add(new AzureRockstar
                {
                    id = user.Id,
                    displayName = user.DisplayName,
                    userPrincipalName = user.UserPrincipalName
                });
            }

            return azureRockstars;
        }

        // GET: api/Rockstar/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AzureRockstar>> GetRockstar(Guid id)
        {
            var apiRes = await _azure.GraphApi.Users[id.ToString()].Request().GetAsync();

            AzureRockstar rockstar = new AzureRockstar
            {
                id = apiRes.Id,
                displayName = apiRes.DisplayName,
                userPrincipalName = apiRes.UserPrincipalName
            };

            return rockstar;
        }

        [HttpPost("SendRockstarOnDemand")]
        public async Task<ActionResult> SendRockstarOndemandRequest(RockstarOndemand rockstarOndemand)
        {
            string connectionString = _configuration.GetValue<string>("ConnectionStrings:EmailSender");
            EmailClient emailClient = new EmailClient(connectionString);

            
            EmailContent emailContent = new EmailContent("New rockstar Ondemand request from: " + rockstarOndemand.Name);
            emailContent.PlainText = rockstarOndemand.Message;
            emailContent.Html = "<strong>" + rockstarOndemand.Message + "</strong> <div style=\"margin - top: 30px;\" >Preferred date:  " + rockstarOndemand.Date.ToLongDateString() + " " + rockstarOndemand.Date.ToShortTimeString() + " UTC</div> <div> From: " + rockstarOndemand.SenderEmail + "</div>";
            List<EmailAddress> emailAddresses = new List<EmailAddress> { new EmailAddress(rockstarOndemand.ReceiverEmail) { DisplayName = rockstarOndemand.Name } };
            EmailRecipients emailRecipients = new EmailRecipients(emailAddresses);
            EmailMessage emailMessage = new EmailMessage("DoNotReply@rockstarmailtest.tk", emailContent, emailRecipients);
            SendEmailResult emailResult = emailClient.Send(emailMessage, CancellationToken.None);

            return Ok();
        }


        [HttpPost("AddRollToRockstar")]
        public async Task<ActionResult> AddRoleToRockstar(RockstarRole rockstarRole)
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
                if (!await RockstarExists(id))
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

        [HttpGet("getimage/{id}")]
        public async Task<ActionResult<byte[]>> GetRockstarImage(Guid id)
        {
            Stream apiRes;
            try
            {
                apiRes = await _azure.GraphApi.Users[id.ToString()].Photo.Content.Request().GetAsync();
            }
            catch 
            {
                return NoContent();
            }
            
            
            byte[] stream;

            using(var memoryStream = new MemoryStream())
            { 
                await apiRes.CopyToAsync(memoryStream);
                stream = memoryStream.ToArray();
            }
            
            return stream;
        }

        private async Task<bool> RockstarExists(Guid id)
        {
            var rockstar = await _azure.GraphApi.Users[id.ToString()].Request().GetAsync();
            return rockstar != null;
        }
    }
}