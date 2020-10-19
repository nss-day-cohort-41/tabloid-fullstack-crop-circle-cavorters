using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ISubscriptionRepository
    {
        public Subscription GetById(int id);
        void Add(Subscription subscription);

    }
}