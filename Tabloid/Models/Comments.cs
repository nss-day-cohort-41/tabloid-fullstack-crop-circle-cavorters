﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models.cs
{
    public class Comment
    {
        public int Id { get; set; }

        public int PostId { get; set; }
        public int UserProfileId { get; set; }
        public string Content { get; set; }
        
        public bool CreateDateTime { get; set; }
        
       
    }
}
