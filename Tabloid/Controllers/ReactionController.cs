using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReactionController : ControllerBase
    {
        private readonly IReactionRepository _reactionRepository;

        public ReactionController(IReactionRepository reactionRepository)
        {
            _reactionRepository = reactionRepository;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var reactions = _reactionRepository.GetAllReactions();
            return Ok(reactions);
        }

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            Reaction reaction = _reactionRepository.GetReactionById(id);

            if (reaction == null)
            {
                return NotFound();
            }
            return Ok(reaction);
        }
    }
}