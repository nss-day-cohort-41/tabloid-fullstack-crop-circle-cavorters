using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public SubscriptionController(ISubscriptionRepository subscriptionRepository, IUserProfileRepository userProfileRepository)
        {
            _subscriptionRepository = subscriptionRepository;
            _userProfileRepository = userProfileRepository;

        }

        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            
            subscription.BeginDateTime = DateTime.Now;
            _subscriptionRepository.Add(subscription);
            return CreatedAtAction("Get", new { id = subscription.Id }, subscription);
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var subscription = _subscriptionRepository.GetById(id);
            if (subscription == null)
            {
                return NotFound();
            }
            return Ok(subscription);
        }
    }
}
