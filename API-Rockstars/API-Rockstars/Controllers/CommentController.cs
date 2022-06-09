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

namespace API_Rockstars.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CommentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Comment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComment()
        {
            return await _context.Comment.Where(x => x.Approved == true).ToListAsync();
        }
        
        // GET: api/Comment
        [HttpGet("notapproved")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetCommentNotApproved()
        {
            return await _context.Comment.Where(x => x.Approved == false).ToListAsync();
        }

        // GET: api/Comment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetComment(Guid id)
        {
            var comment = await _context.Comment.FindAsync(id);

            if (comment == null)
            {
                return NoContent();
            }

            return comment;
        }
        
        // GET: api/Comment/5
        [HttpGet("articleId/{id}")]
        public async Task<ActionResult<List<Comment>>> GetCommentsByArticleIdWhereApporved(Guid id)
        {
            var comments = await _context.Comment.Where(x => x.ArticleId == id && x.Approved == true).ToListAsync();

            if (!comments.Any())
            {
                return NoContent();
            }

            return comments;
        }
        
        // GET: api/Comment/5
        [HttpGet("all/articleId/{id}")]
        public async Task<ActionResult<List<Comment>>> GetCommentsByArticleId(Guid id)
        {
            var comments = await _context.Comment.Where(x => x.ArticleId == id).ToListAsync();

            if (!comments.Any())
            {
                return NoContent();
            }

            return comments;
        }

        // PUT: api/Comment/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(Guid id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
                {
                    return NoContent();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Comment
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<List<Comment>>> PostComment(Comment comment)
        {
            var articleExists = _context.Articles.FirstOrDefault(x => x.Id == comment.ArticleId);

            if (articleExists == null)
            {
                return NoContent();
            }

            comment.CommentDate = DateTime.Now.ToUniversalTime();

            if (comment.CommentText == "")
            {
                return NoContent();
            }
            
            _context.Comment.Add(comment);
            await _context.SaveChangesAsync();

            return await _context.Comment.Where(x => x.ArticleId == comment.ArticleId).ToListAsync();
        }

        // DELETE: api/Comment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(Guid id)
        {
            var comment = await _context.Comment.FindAsync(id);
            if (comment == null)
            {
                return NoContent();
            }

            _context.Comment.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommentExists(Guid id)
        {
            return _context.Comment.Any(e => e.Id == id);
        }
    }
}
