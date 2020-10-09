using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models
{
    public class Category
    {
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
       /* public string FirebaseUserId { get; set; }*/

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}
