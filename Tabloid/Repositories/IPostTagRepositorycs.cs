using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        //START POST TAG METHODS
        List<PostTag> GetAllTagsOnAPost(int id);
        void AddPostTag(PostTag postTag);

        List<PostTag> GetAllPostTags();

        //END POST TAG METHODS

    }
}