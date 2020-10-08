using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAll();
        Tag GetTagById(int id);
        void Add(Tag tag);
        void Delete(int tagId);   
        void Update(Tag tag);

    }
}