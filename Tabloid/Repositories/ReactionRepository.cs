using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class ReactionRepository : BaseRepository, IReactionRepository
    {
        public ReactionRepository(IConfiguration config) : base(config) { }
        public List<Reaction> GetAllReactions()
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, PostId, ReactionId, UserProfileId FROM PostReaction ORDER BY Id";

                    var reader = cmd.ExecuteReader();

                    var reactions = new List<Reaction>();

                    while (reader.Read())
                    {
                        reactions.Add(new Reaction()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                                ReactionId = reader.GetInt32(reader.GetOrdinal("ReactionId")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),

                        });
                    }

                    reader.Close();

                    return reactions;
                }
            }
        }
        public Reaction GetReactionById(int id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, PostId, ReactionId, UserProfileId
                        FROM PostReaction 
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Reaction reaction = new Reaction()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            ReactionId = reader.GetInt32(reader.GetOrdinal("ReactionId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),

                        };

                        reader.Close();
                        return reaction;

                    }
                    reader.Close();
                    return null;
                }
            }
        }
        List<Tag> IReactionRepository.GetAllReactions()
        {
            throw new NotImplementedException();
        }
    }
}