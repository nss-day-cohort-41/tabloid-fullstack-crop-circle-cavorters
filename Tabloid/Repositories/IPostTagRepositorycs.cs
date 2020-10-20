using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        //START POST TAG METHODS
        List<PostTag> GetAllPostTagsOnAPost(int id);
        void AddPostTag(PostTag postTag);

        List<PostTag> GetAllPostTags();

        void DeletePostTag(int id);

        PostTag GetPostTagById(int id);

        //END POST TAG METHODS

    }
}