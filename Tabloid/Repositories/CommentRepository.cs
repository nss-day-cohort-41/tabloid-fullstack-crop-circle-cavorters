using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;



namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration config) : base(config) { }


        

        public List<Comment> GetAllPostComments(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT c.Id AS CommentId, c.Subject, c.Content, c.CreateDateTime,
                                   c.PostId, c.UserProfileId,
                                   p.Id, p.Title, p.Content, 
                                   p.ImageLocation AS HeaderImage,
                                   p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                                   p.CategoryId, p.UserProfileId,
                                   cg.[Name] AS CategoryName,
                                   u.FirstName, u.LastName, u.DisplayName, 
                                   u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                                   u.UserTypeId, 
                                   ut.[Name] AS UserTypeName
                              FROM Comment c
                                   LEFT JOIN Post p ON c.PostId = p.id
                                   LEFT JOIN Category cg ON p.CategoryId = cg.id
                                   LEFT JOIN UserProfile u ON c.UserProfileId = u.id
                                   LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                              WHERE PostId = @id
                              ORDER BY c.CreateDateTime DESC";
                    cmd.Parameters.AddWithValue("@id", postId);
                    var reader = cmd.ExecuteReader();

                    List<Comment>comments = new List<Comment>();

                    while (reader.Read())
                    {
                        comments.Add(NewCommentFromReader(reader));
                    }

                    reader.Close();

                    return (comments);
                }
            }
        }

        public List<Comment> GetAllComments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, PostId, UserProfileId, Subject, Content, CreateDateTime
                        FROM Comment
                        ORDER BY CreateDateTime DESC;";

                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();
                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                        });
                    }
                    reader.Close();
                    return comments;
                }
            }
        }

        public Comment GetCommentById(int id)

        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime,up.Email,up.DisplayName, up.FirstName, up.LastName
                        FROM Comment c
                        LEFT JOIN UserProfile up on c.UserProfileId = up.Id
                        WHERE c.Id = @id
                        ORDER BY c.CreateDateTime DESC;";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    Comment comment = null;
                    if (reader.Read())
                    {
                        comment = new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                Email = DbUtils.GetString(reader, "Email"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName")
                            },
                        };
                    }
                    reader.Close();
                    return comment;
                }
            }
        }






        public void Add(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              INSERT INTO Comment (
                                   Subject, Content, CreateDateTime, PostId, UserProfileId )
                              OUTPUT INSERTED.ID
                              VALUES (
                                   @Subject, @Content, @CreateDateTime, @PostId, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@Content", comment.Content);
                    cmd.Parameters.AddWithValue("@CreateDateTime", comment.CreateDateTime);
                    cmd.Parameters.AddWithValue("@PostId", comment.PostId);
                    cmd.Parameters.AddWithValue("@UserProfileId", comment.UserProfileId);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Comment comment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                 UPDATE Comment
                                 SET
                                     Subject = @Subject,
                                     Content = @Content, 
                                     CreateDateTime = @createDateTime,
                                     PostId = @postId,
                                     UserProfileId = @UserProfileId
                                 WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@Subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@Content", comment.Content);
                    cmd.Parameters.AddWithValue("@CreateDateTime", comment.CreateDateTime);
                    cmd.Parameters.AddWithValue("@PostId", comment.PostId);
                    cmd.Parameters.AddWithValue("@UserProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@id", comment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                 DELETE FROM Comment
                                 WHERE Id = @id
                             ";

                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Comment NewCommentFromReader(SqlDataReader reader)
        {
            return new Comment()
            {
                Id = reader.GetInt32(reader.GetOrdinal("CommentId")),
                Subject = reader.GetString(reader.GetOrdinal("Subject")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                UserProfile = new UserProfile()

                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    ImageLocation = DbUtils.GetNullableString(reader, "AvatarImage"),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                    }
                },
                PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                Post = new Post()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Title = reader.GetString(reader.GetOrdinal("Title")),
                    Content = reader.GetString(reader.GetOrdinal("Content")),
                    ImageLocation = DbUtils.GetNullableString(reader, "HeaderImage"),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                    CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),


                }
            };

        }
    }
}
    
    
