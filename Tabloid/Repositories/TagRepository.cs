using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Utils;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class  TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration config) : base(config) { }
        public List<Tag> GetAllTags()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, name FROM Tag ORDER BY name";

                    var reader = cmd.ExecuteReader();

                    var tags = new List<Tag>();

                    while (reader.Read())
                    {
                        tags.Add(new Tag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
                        });
                    }

                    reader.Close();

                    return tags;
                }
            }
        }
        public Tag GetTagById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, name
                        FROM Tag 
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    //Tag tag = null;

                    if (reader.Read())
                    {
                        Tag tag = new Tag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        };

                        reader.Close();
                        return tag;

                    }
                    reader.Close();
                    return null;
                }
            }
        }

        public void AddTag(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Tag (Name)
                        OUTPUT INSERTED.ID
                        VALUES ( @name )";

                    cmd.Parameters.AddWithValue("@name", tag.Name);

                    //int newlyCreatedId = (int)cmd.ExecuteScalar();
                    //category.Id = newlyCreatedId;

                    int id = (int)cmd.ExecuteScalar();
                    tag.Id = id;
                }
            }
        }

        public void UpdateTag( Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Tag
                            SET 
                                Name = @name
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@name", tag.Name);
                    cmd.Parameters.AddWithValue("@id", tag.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteTag(int tagId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Tag 
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", tagId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<PostTag> GetAllTagsOnAPost(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"SELECT pt.Id, pt.TagId, pt.PostId, Tag.Name 
                            FROM PostTag pt
                            JOIN Post ON pt.PostId = Post.Id
                            JOIN Tag ON pt.TagId = Tag.Id
                            WHERE PostId = @postId
                            ORDER BY Name";

                    cmd.Parameters.AddWithValue("@postId", id);

                    var reader = cmd.ExecuteReader();

                    var postTags = new List<PostTag>();

                    while (reader.Read())
                    {
                        PostTag postTag = new PostTag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            TagId = reader.GetInt32(reader.GetOrdinal("TagId")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),

                            Tag = new Tag()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("TagId")),
                                Name = reader.GetString(reader.GetOrdinal("Name"))
                            }
                        };
                        postTags.Add(postTag);
                    }

                    reader.Close();

                    return postTags;
                }
            }
        }

        public void AddPostTag(PostTag postTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO PostTag (TagId, PostId)                  
                        OUTPUT INSERTED.Id
                        VALUES (@TagId, @PostId)";


                    cmd.Parameters.AddWithValue("@tagId", postTag.TagId);
                    cmd.Parameters.AddWithValue("@postId", postTag.PostId);

                    ////Tag = new Tag()
                    ////{
                    ////    cmd.Parameters.AddWithValue("@name", tag.Name);
                    ////}
                    ////int newlyCreatedId = (int)cmd.ExecuteScalar();
                    ////category.Id = newlyCreatedId;


                    int id = (int)cmd.ExecuteScalar();
                    postTag.Id = id;
                    //DbUtils.AddParameter(cmd, "@PostId", postTag.PostId);
                    //DbUtils.AddParameter(cmd, "@TagId", postTag.TagId);

                    //postTag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
      

    }
}
