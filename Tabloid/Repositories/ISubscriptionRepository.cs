using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ISubscriptionRepository
    {
        public Subscription GetByUserId(int id, int authorId);
        void Add(Subscription subscription);
        //public Subscription GetById(int id, int authorId);

    }
}