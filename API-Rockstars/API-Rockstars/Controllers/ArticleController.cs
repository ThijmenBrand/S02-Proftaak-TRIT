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
    [Route("api/article")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ArticleController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Article
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticles()
        {
            List<Article> articles = await _context.Articles.ToListAsync();

            foreach (var article in articles)
            {
                Tribe tribe = await _context.Tribes.FindAsync(article.TribeId);
                if (tribe != null)
                {
                    article.TribeName = tribe.Name;
                }
            
                Rockstar rockstar = await _context.Rockstars.FindAsync(article.RockstarId);
                if (rockstar != null)
                {
                    article.RockstarName = rockstar.Name;
                }
                
                var viewCount = await _context.ArticleViews.Where(x => x.ArticleId == article.Id).ToListAsync();
                article.ViewCount = viewCount.Count();
            }
            
            return articles;
        }

        // GET: api/Article/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(Guid id)
        {
            var article = await _context.Articles.FindAsync(id);

            if (article == null)
            {
                return NoContent();
            }

            Tribe tribe = await _context.Tribes.FindAsync(article.TribeId);
            if (tribe != null)
            {
                article.TribeName = tribe.Name;
            }
            
            Rockstar rockstar = await _context.Rockstars.FindAsync(article.RockstarId);
            if (rockstar != null)
            {
                article.RockstarName = rockstar.Name;
            }
            
            var viewCount = await _context.ArticleViews.Where(x => x.ArticleId == article.Id).ToListAsync();

            article.ViewCount = viewCount.Count();

            return article;
        }

        [HttpGet("GetArticlesByTribe/{id}")]
        public async Task<ActionResult<List<Article>>> GetArticleByTribe(Guid id)
        {
            List<Article> articles = await _context.Articles.Where(x => x.TribeId == id).ToListAsync();

            if (articles.Count == 0)
            {
                return NoContent();
            }

            foreach (var article in articles)
            {
                Tribe tribe = await _context.Tribes.FindAsync(article.TribeId);
                if (tribe != null)
                {
                    article.TribeName = tribe.Name;
                }
            
                Rockstar rockstar = await _context.Rockstars.FindAsync(article.RockstarId);
                if (rockstar != null)
                {
                    article.RockstarName = rockstar.Name;
                }
                
                var viewCount = await _context.ArticleViews.Where(x => x.ArticleId == article.Id).ToListAsync();
                article.ViewCount = viewCount.Count();
            }

            return articles;
        }
        
        [HttpGet("GetArticlesByRockstar/{id}")]
        public async Task<ActionResult<List<Article>>> GetArticlesByRockstar(Guid id)
        {
            List<Article> articles = await _context.Articles.Where(x => x.RockstarId == id).ToListAsync();

            if (articles.Count == 0)
            {
                return NoContent();
            }
            
            foreach (var article in articles)
            {
                Tribe tribe = await _context.Tribes.FindAsync(article.TribeId);
                if (tribe != null)
                {
                    article.TribeName = tribe.Name;
                }
            
                Rockstar rockstar = await _context.Rockstars.FindAsync(article.RockstarId);
                if (rockstar != null)
                {
                    article.RockstarName = rockstar.Name;
                }
                
                var viewCount = await _context.ArticleViews.Where(x => x.ArticleId == article.Id).ToListAsync();
                article.ViewCount = viewCount.Count();
            }

            return articles;
        }
        
        [HttpGet("GetArticles/TribeId/{tribeId}/RockstarId/{rockstarId}")]
        public async Task<ActionResult<List<Article>>> GetArticlesByTribeAndRockstar(Guid tribeId, Guid rockstarId)
        {
            List<Article> articles = await _context.Articles.Where(x => x.RockstarId == rockstarId && x.TribeId == tribeId).ToListAsync();

            if (articles.Count == 0)
            {
                return NoContent();
            }

            foreach (var article in articles)
            {
                var viewCount = await _context.ArticleViews.Where(x => x.ArticleId == article.Id).ToListAsync();
                article.ViewCount = viewCount.Count();
            }

            return articles;
        }
        

        // PUT: api/Article/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(Guid id, Article article)
        {
            if (id != article.Id)
            {
                return BadRequest();
            }

            _context.Entry(article).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(id))
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

        // POST: api/Article
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Article>> PostArticle(Article article)
        {
            article.PublishDate = DateTime.Now.ToUniversalTime();

            _context.Articles.Add(article);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArticle", new { id = article.Id }, article);
        }

        // DELETE: api/Article/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(Guid id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NoContent();
            }

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        //Update viewcount
        [HttpPost("updateViewCount")]
        public async Task<IActionResult> UpdateArticleViewCount(ArticleView view)
        {
            var checkArticleView = await _context.ArticleViews.FirstOrDefaultAsync(x => x.FrontendUserId == view.FrontendUserId && x.ArticleId == view.ArticleId);

            if (checkArticleView != null)
            {
                return NoContent();
            }

            _context.ArticleViews.Add(view);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        

        private bool ArticleExists(Guid id)
        {
            return _context.Articles.Any(e => e.Id == id);
        }
    }
}
