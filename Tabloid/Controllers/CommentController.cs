using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;
using Tabloid.Models;
using Microsoft.AspNetCore.Authorization;


namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IPostRepository _postRepo;
        private readonly IUserProfileRepository _userRepo;

        public CommentController(ICommentRepository commentRepository, IPostRepository postRepository,
            IUserProfileRepository userRepository)
        {
            _commentRepository = commentRepository;
            _postRepo = postRepository;
            _userRepo = userRepository;
        }

        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            comment.CreateDateTime = DateTime.Now;
            _commentRepository.Add(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }




        [HttpGet("post/{postId}")]
        public IActionResult GetAllPostComments(int postId)
        {
            var comments = _commentRepository.GetAllPostComments(postId);
            return Ok(comments);
        }

        // GET api/<CommentController>/5
        [HttpGet("{id}")]
        public IActionResult GetCommentById(int id)
        {
            return Ok(_commentRepository.GetCommentById(id));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_commentRepository.GetAllComments());
        }












        // POST api/<CommentController>
        [HttpPost]
        public IActionResult Add(Comment comment)
        {
            _commentRepository.Add(comment);
            return base.Created("", comment); //returns the comment, not including headers
        }








        // PUT api/<CommentController>/5
        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, Comment comment)
        {

            if (id != comment.Id)
            {
                return BadRequest();
            }
            _commentRepository.Update(comment);
            return Ok();
        }



        // DELETE api/<CommentController>/5
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.Delete(id);
            return NoContent();
        }
    }
}

    

