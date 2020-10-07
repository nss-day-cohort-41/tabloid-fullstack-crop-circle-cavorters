using System.Collections.Generic;
using Tabloid.Models.cs;

namespace TabloidMVC.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        void Delete(int id);
        List<Comment> GetAllPostComments(int postId);
        Comment GetCommentById(int id);
        void Update(Comment comment);
    }
}