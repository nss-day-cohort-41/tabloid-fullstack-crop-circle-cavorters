using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;


namespace Tabloid.Models
{
    public class PostTag
    {
        public Tag Tag { get; set; }
        public int Id { get; set; }

        public int TagId { get; set; }
        public int PostId { get; set; }
      
    }
}

