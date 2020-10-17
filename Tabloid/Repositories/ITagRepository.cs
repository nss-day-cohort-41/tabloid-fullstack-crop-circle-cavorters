using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        //START POST TAG METHODS
        List<PostTag> GetAllTagsOnAPost(int id);
        void AddPostTag(PostTag postTag);

        //END POST TAG METHODS


        List<Tag> GetAllTags();
        Tag GetTagById(int id);
        void AddTag(Tag tag);
        void DeleteTag(int tagId);
        void UpdateTag(Tag tag);

    }
}