using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        void Delete(int postId);
        
        List<Comment> GetAllPostComments(int postId);
        List<Comment> GetAllComments();

        Comment GetCommentById(int commentId);

        void Update(Comment comment);
    }
}