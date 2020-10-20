using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
    { 
        public SubscriptionRepository(IConfiguration config) : base(config) { }

        private Subscription NewSubscriptionFromReader(SqlDataReader reader)
        {
            return new Subscription()         
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                SubscriberUserProfileId = reader.GetInt32(reader.GetOrdinal("SubscriberUserProfileId")),
                ProviderUserProfileId = reader.GetInt32(reader.GetOrdinal("ProviderUserProfileId")),
                BeginDateTime = reader.GetDateTime(reader.GetOrdinal("BeginDateTime")),
                EndDateTime = reader.GetDateTime(reader.GetOrdinal("EndDateTime")),

            };
        }

        public void Add(Subscription subscription)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" INSERT INTO Subscription 
                                                (SubscriberUserProfileId, 
                                                ProviderUserProfileId,
                                                BeginDateTime
                                                )

                                         OUTPUT INSERTED.Id
                                         VALUES (@SubscriberId,
                                                @ProviderId, 
                                                @BeginDateTime
                                                )";

                    DbUtils.AddParameter(cmd, "@SubscriberUserProfileId", subscription.SubscriberUserProfileId);
                    DbUtils.AddParameter(cmd, "@ProviderUserProfileId", subscription.ProviderUserProfileId);
                    DbUtils.AddParameter(cmd, "@BeginDateTime", subscription.BeginDateTime);
                    DbUtils.AddParameter(cmd, "@EndDateTime", DbUtils.ValueOrDBNull(subscription.EndDateTime));

                    subscription.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Subscription> GetAllFollowersForAuthor(int authorId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id, s.SubscriberUserProfileId, s.ProviderUserProfileId, s.BeginDateTime, s.EndDateTime
                        FROM Subscription s
                        LEFT JOIN UserProfile up ON s.SubscriberUserProfileId = up.id
                        WHERE s.ProviderUserProfileId = @AuthorId ";

                    DbUtils.AddParameter(cmd, "@AuthorId", authorId);
                    //Subscription subscription = null;
                    var reader = cmd.ExecuteReader();
                    var subscriptions = new List<Subscription>();

                    if (reader.Read())
                    {

                        {
                            subscriptions.Add(NewSubscriptionFromReader(reader));
                        };
                        reader.Close();
                        return subscriptions;

                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
            //Getting all the subscribers to one user(author) by the user's Id
            //public Subscription GetByUserId(int id, int authorId)
            //{
            //    using (var conn = Connection)
            //    {
            //        conn.Open();
            //        using (var cmd = conn.CreateCommand())
            //        {
            //            cmd.CommandText = @"
            //                SELECT s.Id, s.SubscriberUserProfileId, s.ProviderUserProfileId, s.BeginDateTime, s.EndDateTime
            //                FROM Subscription s
            //                LEFT JOIN UserProfile up ON s.SubscriberUserProfileId = up.id
            //                WHERE s.SubscriberUserProfileId = @FollowerId 
            //                AND s.ProviderUserProfileId = @AuthorId ";

            //            DbUtils.AddParameter(cmd, "@FollowerId", id);
            //            DbUtils.AddParameter(cmd, "@AuthorId", authorId);

            //            var reader = cmd.ExecuteReader();

            //            if (reader.Read())
            //            {
            //                Subscription subscription = new Subscription
            //                {
            //                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
            //                    SubscriberUserProfileId = reader.GetInt32(reader.GetOrdinal("SubscriberUserProfileId")),
            //                    ProviderUserProfileId = reader.GetInt32(reader.GetOrdinal("ProviderUserProfileId")),
            //                    BeginDateTime = reader.GetDateTime(reader.GetOrdinal("BeginDateTime")),
            //                    EndDateTime = reader.GetDateTime(reader.GetOrdinal("EndDateTime")),

            //                };
            //                reader.Close();
            //                return subscription;

            //            }
            //            else
            //            {
            //                reader.Close();
            //                return null;
            //            }
            //        }
            //    }
            //}
        }
    }
}
