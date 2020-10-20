using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllApprovedPosts();
        public Post GetPublishedPostById(int id);
        void Add(Post post);
        void UpdatePost(Post post);
        void DeletePost(int id);
        Post GetUserPostsById(int id, int userProfileId);
        List<Post> GetAllApprovedPostsForUser(int id);
        List<Post> GetAllUnapprovedPosts();

    }
}