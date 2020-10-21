using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ISubscriptionRepository
    {
        //public Subscription GetByUserId(int id, int authorId);
        void Add(Subscription subscription);
        public List <Subscription> GetAllFollowersForAuthor(int authorId);

    }
}