using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        List<Tag> GetAllTagsOnAPost(int postId);
        Tag GetTagById(int id);
        void AddTag(Tag tag);
        void DeleteTag(int tagId);   
        void UpdateTag( Tag tag);

        

    }
}