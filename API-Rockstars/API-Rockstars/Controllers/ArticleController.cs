#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Rockstars;
using API_Rockstars.Azure;
using API_Rockstars.Models;

namespace API_Rockstars.Controllers
{
    [Route("api/article")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly AzureConfiguration _azure;

        public ArticleController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _azure = new AzureConfiguration(configuration);
        }

        // GET: api/Article
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Article>>> GetAllArticles()
        {

            List<Article> articles = await _context.Articles.ToListAsync();


            articles = await getAllAtributesFromArticles(articles);

            return articles;
        }


        // GET: api/Article/Count
        [HttpGet("count")]
        public async Task<ActionResult<int>> GetArticleCount()
        {
            int count = await _context.Articles.Where(x => x.Published == true).CountAsync();
            
            return count;
        }
        
        // GET: api/Article/Count/Tribe/id
        [HttpGet("count/tribe/{id}")]
        public async Task<ActionResult<int>> GetArticleCountByTribeId(Guid id)
        {
            int count = await _context.Articles.Where(x => x.Published == true && x.TribeId == id).CountAsync();
            
            return count;
        }
        
        // GET: api/Article/Count/Tribe/id/rockstar/id
        [HttpGet("count/tribe/{id}/rockstar/{rockstar}")]
        public async Task<ActionResult<int>> GetArticleCountByTribeId(Guid id, Guid rockstar)
        {
            int count = await _context.Articles.Where(x => x.Published == true && x.TribeId == id && x.RockstarId == rockstar).CountAsync();
            
            return count;
        }
        
        // GET: api/Article/Count/rockstar/id
        [HttpGet("count/rockstar/{id}")]
        public async Task<ActionResult<int>> GetArticleCountByRockstarId(Guid id)
        {
            int count = await _context.Articles.Where(x => x.Published == true && x.RockstarId == id).CountAsync();
            
            return count;
        }

        // GET: api/Article with data
        [HttpGet("start/{start}/limit/{limit}")]
        public async Task<ActionResult<IEnumerable<Article>>> CopyGetArticles(int start, int limit, string data)
        {
            start = start < 0 ? 0 : start;
            List<Article> returnArticles = new List<Article>();
            List<Article> articles = await _context.Articles.Where(x => x.Published == true).ToListAsync();

            foreach(var article in articles)
            {
                if(article.Title == data)
                {
                    returnArticles.Add(article);
                }
            }


            articles = await getAllAtributesFromArticles(articles);

            if (!string.IsNullOrEmpty(data))
            {
                foreach (var article in articles)
                {
                    if (article.Title.ToLower().Contains(data.ToLower()))
                    {
                        returnArticles.Add(article);
                    }
                    if (article.RockstarName.ToLower().Contains(data.ToLower()))
                    {
                        returnArticles.Add(article);
                    }
                }
            }
            else
            {
                returnArticles = articles;
            }
            

            return returnArticles.Skip(start).Take(limit).ToList();
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

            var group = await _azure.GraphApi.Groups[article.TribeId.ToString()].Request().GetAsync();
            if (group != null)
            {
                article.TribeName = group.DisplayName;
            }

            var rockstar = await _azure.GraphApi.Users[article.RockstarId.ToString()].Request().GetAsync();
            if (rockstar != null)
            {
                article.RockstarName = rockstar.DisplayName;
            }

            var viewCount = await _context.ArticleViews.Where(x => x.ArticleId == article.Id).ToListAsync();
            article.ViewCount = viewCount.Count();

            return article;
        }

        [HttpGet("GetArticlesByTribe/{id}/start/{start}/limit/{limit}")]
        public async Task<ActionResult<List<Article>>> GetArticleByTribe(Guid id, int start, int limit)
        {
            start = start < 0 ? 0 : start;
            List<Article> articles = await _context.Articles.Where(x => x.TribeId == id && x.Published == true).Skip(start).Take(limit).ToListAsync();

            if (articles.Count == 0)
            {
                return NoContent();
            }

            articles = await getAllAtributesFromArticles(articles);

            return articles;
        }
        
        [HttpGet("GetArticlesByRockstar/{id}/start/{start}/limit/{limit}")]
        public async Task<ActionResult<List<Article>>> GetArticlesByRockstar(Guid id, int start, int limit)
        {
            start = start < 0 ? 0 : start;
            List<Article> articles = await _context.Articles.Where(x => x.RockstarId == id && x.Published == true).Skip(start).Take(limit).ToListAsync();

            if (articles.Count == 0)
            {
                return NoContent();
            }

            articles = await getAllAtributesFromArticles(articles);

            return articles;
        }
        
        [HttpGet("GetArticles/TribeId/{tribeId}/RockstarId/{rockstarId}/start/{start}/limit/{limit}")]
        public async Task<ActionResult<List<Article>>> GetArticlesByTribeAndRockstar(Guid tribeId, Guid rockstarId, int start, int limit)
        {
            start = start < 0 ? 0 : start;
            List<Article> articles = await _context.Articles.Where(x => x.RockstarId == rockstarId && x.TribeId == tribeId && x.Published == true).Skip(start).Take(limit).ToListAsync();

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
            var article = await _context.Articles.FirstOrDefaultAsync(x => x.Id == view.ArticleId);

            if (article != null)
            {
                article.TotalViewCount++;
                _context.Articles.Update(article);
                await _context.SaveChangesAsync();
            }

            var checkArticleView = await _context.ArticleViews.FirstOrDefaultAsync(x => x.FrontendUserId == view.FrontendUserId && x.ArticleId == view.ArticleId);

            if (checkArticleView != null)
            {
                return NoContent();
            }

            _context.ArticleViews.Add(view);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("CheckIfUserLiked/{articleId}/{userId}")]
        public async Task<IActionResult> CheckIfUserLiked(string userId, Guid articleId)
        {
            if (!ArticleExists(articleId))
            {
                return BadRequest("Article does not exist.");
            }
            var isAlreadyLiked = await _context.ArticleLike.AnyAsync(al => al.FrontendUserId == userId && al.ArticleId == articleId);

            return Ok(isAlreadyLiked);
        }

        [HttpPut("incrementLikeCount/{articleId}/{userId}")]
        public async Task<IActionResult> IncrementLikeCount(string userId, Guid articleId)
        {
            //Check if article exists
            if (!ArticleExists(articleId))
            {
                return BadRequest("Article does not exist.");
            }
            //Check if article has already been liked
            var isAlreadyLiked = await _context.ArticleLike.AnyAsync(al => al.FrontendUserId == userId && al.ArticleId == articleId);
            if (isAlreadyLiked)
            {
                return BadRequest("Article has already been liked by this user.");
            }
            //Create articleLike
            var articleLike = new ArticleLike
            {
                ArticleId = articleId,
                FrontendUserId = userId
            };
            //Add articleLike
            _context.ArticleLike.Add(articleLike);
            
            //Increment LikeCount in article
            Article article = await _context.Articles.FirstOrDefaultAsync(a => a.Id == articleId);
            article.LikeCount++;

            //Save changes
            await _context.SaveChangesAsync();
            int likeCount = _context.Articles.FirstOrDefault(a => a.Id == articleId).LikeCount;
            return Ok(likeCount);
        }

        [HttpPut("decrementLikeCount/{articleId}/{userId}")]
        public async Task<IActionResult> DecrementLikeCount(string userId, Guid articleId)
        {
            //Check if article exists
            if (!ArticleExists(articleId))
            {
                return BadRequest("Article does not exist.");
            }
            //Check if article has already been liked
            var isAlreadyLiked = await _context.ArticleLike.AnyAsync(al => al.FrontendUserId == userId && al.ArticleId == articleId);
            if (!isAlreadyLiked)
            {
                return BadRequest("Article has not yet been liked, thus cannot be unliked.");
            }
            //Remove articleLike
            ArticleLike articleLike = await _context.ArticleLike.FirstOrDefaultAsync(a => a.FrontendUserId == userId && a.ArticleId == articleId);
            _context.ArticleLike.Remove(articleLike);
            

            //Decrement LikeCount in article
            Article article = await _context.Articles.FirstOrDefaultAsync(a => a.Id == articleId);
            article.LikeCount--;

            //Save changes
            await _context.SaveChangesAsync();
            int likeCount = _context.Articles.FirstOrDefault(a => a.Id == articleId).LikeCount;
            return Ok(likeCount);
        }

        [HttpPost("checkIfAlreadyLiked")]
        public async Task<bool> CheckIfAlreadyLiked(ArticleLike like)
        {
            var checkArticleLike = await _context.ArticleLike.FirstOrDefaultAsync(x => x.FrontendUserId == like.FrontendUserId && x.ArticleId == like.ArticleId);

            if (checkArticleLike == null)
            {
                return false;
            }
            return true;
        }

        [HttpPost("getLikeCount")]
        public async Task<ActionResult<int>> GetLikeCount(Guid articleId)
        {
            if (!ArticleExists(articleId))
            {
                return BadRequest("Article was not found.");
            }
            int count = await _context.ArticleLike.CountAsync();
            return count;
        }

        private bool ArticleExists(Guid id)
        {
            return _context.Articles.Any(e => e.Id == id);
        }

        private async Task<List<Article>> getAllAtributesFromArticles(List<Article> articles)
        {
            foreach (var article in articles)
            {
                var group = await _azure.GraphApi.Groups[article.TribeId.ToString()].Request().GetAsync();
                if (group != null)
                {
                    article.TribeName = group.DisplayName;
                }

                var rockstar = await _azure.GraphApi.Users[article.RockstarId.ToString()].Request().GetAsync();
                if (rockstar != null)
                {
                    article.RockstarName = rockstar.DisplayName;
                }

                var viewCount = await _context.ArticleViews.Where(x => x.ArticleId == article.Id).ToListAsync();
                article.ViewCount = viewCount.Count();

                var likeCount = await _context.ArticleLike.Where(x => x.ArticleId == article.Id).ToListAsync();
                article.LikeCount = likeCount.Count();
            }

            return articles;
        }


    }
}
