using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Utils;
using Tabloid.Models;
using Microsoft.Data.SqlClient;

namespace Tabloid.Repositories
{
    public class PostTagRepository : BaseRepository, IPostTagRepository
    {
        public PostTagRepository(IConfiguration config) : base(config) { }


        public List<PostTag> GetAllPostTags()
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
                            ORDER BY Name";

                    //cmd.Parameters.AddWithValue("@id", id);

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


        public List<PostTag> GetAllPostTagsOnAPost(int id)
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

        public PostTag GetPostTagById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    //cmd.CommandText = @"
                    //    SELECT Id, TagId, PostId
                    //        FROM PostTag 


                    //    WHERE Id = @id";

                    cmd.CommandText =
                       @"SELECT pt.Id, pt.TagId, pt.PostId, Tag.Name 
                            FROM PostTag pt
                            JOIN Post ON pt.PostId = Post.Id
                            JOIN Tag ON pt.TagId = Tag.Id
                            WHERE pt.Id = @id
                            ";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    //Tag tag = null;

                    if (reader.Read())
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

                        reader.Close();
                        return postTag;

                    }
                    reader.Close();
                    return null;
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
                    INSERT INTO PostTag(PostId, TagId)
                        OUTPUT INSERTED.ID
                        VALUES (@postId, @tagId)";


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
        public void DeletePostTag(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM PostTag 
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
