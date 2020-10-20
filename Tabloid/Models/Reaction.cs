using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace Tabloid.Models
{
    public class Reaction
    {
        public int Id { get; set; }

        public int PostId { get; set; }

        public int ReactionId { get; set; }

        public int UserProfileId { get; set; }

    }
}