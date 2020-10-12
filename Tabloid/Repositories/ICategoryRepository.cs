using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
        /*object GetbyId(int id);*/

        void CreateCategory(Category category);
        void EditCategory(Category category);

        void DeleteCategory(int id);

    }
}
