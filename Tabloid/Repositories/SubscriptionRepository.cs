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
                                                BeginDateTime)

                                         OUTPUT INSERTED.Id
                                         VALUES (@SubscriberId,
                                                @ProviderId, 
                                                @BeginDateTime)";

                    DbUtils.AddParameter(cmd, "@SubscriberUserProfileId", subscription.SubscriberUserProfileId);
                    DbUtils.AddParameter(cmd, "@ProviderUserProfileId", subscription.ProviderUserProfileId);
                    DbUtils.AddParameter(cmd, "@BeginDateTime", subscription.BeginDateTime);

                    subscription.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public Subscription GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT 
                                        SubscriberUserProfileId, 
                                        ProviderUserProfileId,
                                        BeginDateTime, EndDateTime
                                        FROM Subscription

                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    Subscription subscription = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        DbUtils.AddParameter(cmd, "@id", subscription.Id);
                        DbUtils.AddParameter(cmd, "@SubscriberUserProfileId", subscription.SubscriberUserProfileId);
                        DbUtils.AddParameter(cmd, "@ProviderUserProfileId", (subscription.ProviderUserProfileId));
                        DbUtils.AddParameter(cmd, "@BeginDateTime", DateTime.Now);
                        DbUtils.AddParameter(cmd, "@EndDateTime", DbUtils.ValueOrDBNull(subscription.EndDateTime));
                                           }
                    reader.Close();

                    return subscription;
                }
            }
        }
    }
}
