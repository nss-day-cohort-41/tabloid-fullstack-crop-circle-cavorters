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
   // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        private readonly IPostTagRepository _postTagRepository;
        private readonly ITagRepository _tagRepository;


        public PostTagController(
            ITagRepository tagRepository,
             IPostTagRepository postTagRepository)
        {
            _tagRepository = tagRepository;
            _postTagRepository = postTagRepository;
        }

        //[HttpGet]
        //public IActionResult Get()
        //{
        //    var tags = _tagRepository.GetAllTags();
        //    return Ok(tags);
        //}

        [HttpGet]
        public IActionResult Get()
        {
            var allposttags = _postTagRepository.GetAllPostTags();
            return Ok(allposttags);
        }

        [HttpGet("GetSinglePT/{id}")]
        public IActionResult GetSinglePT(int id)
        {
            //postTag.Name = "yeet";
            PostTag postTag = _postTagRepository.GetPostTagById(id);

            if (postTag == null)
            {
                return NotFound();
            }
            return Ok(postTag);

            //var singleposttag = _postTagRepository.GetPostTagById(id);
            //return Ok(singleposttag);
        }


        [HttpGet("GetPT/{id}")]
      
          public IActionResult GetPT(int id)
        {
            List<PostTag> postTags = _postTagRepository.GetAllPostTagsOnAPost(id);
            if (postTags == null)
            {
                return NotFound();
            }
            return Ok(postTags);
        }


        [HttpPost]
        public IActionResult Post(PostTag postTag)
        {
             //_tagRepository.GetAllTagsOnAPost(postTag.PostId);
            _postTagRepository.AddPostTag(postTag);
            return NoContent();
           //return CreatedAtAction("Get", new { id = postTag.Id }, postTag);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postTagRepository.DeletePostTag(id);
            return NoContent();
        }


    }
}
