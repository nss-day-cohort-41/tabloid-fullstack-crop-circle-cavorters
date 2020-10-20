using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IReactionRepository
    {
        List<Tag> GetAllReactions();
        Reaction GetReactionById(int id);

    }
}