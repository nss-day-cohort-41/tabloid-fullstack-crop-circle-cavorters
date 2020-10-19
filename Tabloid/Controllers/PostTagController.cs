using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;
using Tabloid.Models;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly ITagRepository _tagRepository;


        public PostTagController(ITagRepository tagRepository, IPostRepository postRepository)
        {
            _tagRepository = tagRepository;
            _postRepository = postRepository;



        }

        [HttpGet]
        public IActionResult Get()
        {
            var tags = _tagRepository.GetAllTags();
            return Ok(tags);
        }


        [HttpGet("GetPT/{id}")]
       // public IActionResult Get(int postId, int id)
          public IActionResult GetPT(int id)
        {
            List<PostTag> postTags = _tagRepository.GetAllTagsOnAPost(id);
            if (postTags == null)
            {
                return NotFound();
            }
            return Ok(postTags);
        }


        [HttpPost]
        public IActionResult Post(PostTag postTag)
        {
            _tagRepository.AddPostTag(postTag);
            //return NoContent();
            return Ok();
            //return CreatedAtAction("Get", new { id = postTag.Id }, postTag);
        }


    }
}
