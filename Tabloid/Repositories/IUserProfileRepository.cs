using Tabloid.Models;
using System.Collections.Generic;

namespace Tabloid.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetUserProfileById(int id);
        void UpdateUserProfile(UserProfile userProfile);
        List<UserProfile> GetAllActive();
        List<UserProfile> GetAllInactive();
    }
}