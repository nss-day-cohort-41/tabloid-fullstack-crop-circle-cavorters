using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        Tag GetTagById(int id);
        void AddTag(Tag tag);
        void DeleteTag(int tagId);   
        void UpdateTag(Tag tag);

    }
}