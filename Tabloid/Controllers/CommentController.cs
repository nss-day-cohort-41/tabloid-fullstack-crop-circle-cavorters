using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;
using Tabloid.Models;

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

        [HttpGet]
        public IActionResult Get(int id)
        {
            var comments = _commentRepository.GetAllPostComments(id);
            return Ok(comments);
        }

    }
}
