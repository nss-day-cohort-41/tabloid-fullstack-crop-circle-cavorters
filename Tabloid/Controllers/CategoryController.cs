using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(
            ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var categories = _categoryRepository.GetAllCategories();
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            Category category = _categoryRepository.GetCategoryById(id);

            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepository.AddCategory(category);
            return CreatedAtAction("Get", new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _categoryRepository.EditCategory(category);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _categoryRepository.DeleteCategory(id);
            return NoContent();
        }

    }
}