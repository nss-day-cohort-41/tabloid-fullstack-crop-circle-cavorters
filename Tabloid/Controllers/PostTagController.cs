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
    //[Authorize]
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
            //_postRepository.GetPublishedPostById(id);
            // _tagRepository.GetAllTags();
            // return Ok(_tagRepository.GetAllTagsOnAPost(id));
            //var postTags = _tagRepository.GetAllTagsOnAPost(id);
            //return Ok(postTags);

            List<PostTag> postTags = _tagRepository.GetAllTagsOnAPost(id);
            if (postTags == null)
            {
                return NotFound();
            }
            return Ok(postTags);
            //return Ok(_tagRepository.GetAllTagsOnAPost(postId));
        }


        //[HttpPost]
        //public IActionResult Post(Tag tag)
        //{
        //    _tagRepository.AddTag(tag);
        //    return CreatedAtAction("Get", new { id = tag.Id }, tag);
        //}


    }
}
