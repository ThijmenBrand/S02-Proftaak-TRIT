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
                    userPrincipalName = user.UserPrincipalName,
                    RockstarSocial = _context.RockstarSocials.FirstOrDefault(x => x.RockstarId.ToString() == user.Id)
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
                userPrincipalName = apiRes.UserPrincipalName,
                RockstarSocial = _context.RockstarSocials.FirstOrDefault(x => x.RockstarId.ToString() == apiRes.Id)
            };

            return rockstar;
        }

        [HttpPost("SendRockstarOnDemand")]
        public async Task<ActionResult> SendRockstarOndemandRequest(RockstarOndemand rockstarOndemand)
        {
            string CC = _configuration.GetValue<string>("CCOnDemandEmail");
            
            string connectionString = _configuration.GetValue<string>("ConnectionStrings:EmailSender");
            EmailClient emailClient = new EmailClient(connectionString);

            EmailContent emailContent = new EmailContent("New rockstar Ondemand request from: " + rockstarOndemand.Name);
            emailContent.PlainText = rockstarOndemand.Message;
            emailContent.Html = "<strong>" + rockstarOndemand.Message + "</strong> <div style=\"margin - top: 30px;\" >Preferred date:  " + rockstarOndemand.Date.ToLongDateString() + " " + rockstarOndemand.Date.ToShortTimeString() + " UTC</div> <div> From: " + rockstarOndemand.SenderEmail + "</div>";
            List<EmailAddress> emailAddresses = new List<EmailAddress> { new(rockstarOndemand.ReceiverEmail) { DisplayName = rockstarOndemand.Name }, new(CC) { DisplayName = CC.Remove(CC.IndexOf('@'), CC.Length - CC.IndexOf('@'))  } };
            EmailRecipients emailRecipients = new EmailRecipients(emailAddresses);
            EmailMessage emailMessage = new EmailMessage("DoNotReply@rockstarmailtest.tk", emailContent, emailRecipients);
            emailClient.Send(emailMessage, CancellationToken.None);

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
        
        [HttpPost("AddRockstarsSocial/{id}")]
        public async Task<ActionResult> AddSocialsToRockstar(Guid id, RockstarSocial rockstarSocial)
        {
            RockstarSocial checkDuplicate = _context.RockstarSocials.FirstOrDefault(x => x.RockstarId == rockstarSocial.Id);

            if (checkDuplicate != null)
                return BadRequest("This rockstar is already has socials");

            _context.RockstarSocials.Add(rockstarSocial);
            await _context.SaveChangesAsync();

            return Ok();
        }
        
        [HttpPut("UpdateRockstarSocial")]
        public async Task<ActionResult> UpdateSocialsFromRockstar(RockstarSocial rockstarSocial)
        {
            _context.RockstarSocials.Update(rockstarSocial);
            await _context.SaveChangesAsync();

            return Ok();
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
    }
}