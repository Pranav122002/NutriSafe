import React, { useState, useEffect } from "react";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const BlogApp = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    userId: "",
  });
  const [newComment, setNewComment] = useState({ text: "" });

  // Fetch all blog posts on component mount
  // useEffect(() => {
  //   fetch(`${API_BASE_URL}/get-blogposts`)
  //     .then(response => response.json())
  //     .then(data => setBlogPosts(data))
  //     .catch(error => console.error('Error fetching blog posts:', error));
  // }, []);
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get-blogposts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBlogPosts(data);
        } else {
          console.error("Error fetching blog posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  // Function to handle form submission for creating a new blog post
  const handleCreateBlogPost = async (e) => {
    e.preventDefault();

    setNewPost({
      ...newPost,
      userId: JSON.parse(localStorage.getItem("user"))._id,
    });

    try {
      const response = await fetch(`${API_BASE_URL}/create-blogpost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify(newPost),
      });

      if (response.status === 201) {
        const newPostData = await response.json();
        setBlogPosts([...blogPosts, newPostData]);

        console.log("newpost = ", newPost);

        setNewPost({ title: "", content: "", userId: "" });
      } else {
        console.error("Error creating blog post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  // Function to handle form submission for creating a new comment
  const handleCreateComment = async (postId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/create-comment/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ text: newComment.text }),
      });

      if (response.status === 201) {
        const updatedPostData = await response.json();
        // Update the blogPosts state to reflect the new comment
        setBlogPosts(
          blogPosts.map((post) =>
            post._id === updatedPostData._id ? updatedPostData : post
          )
        );
        setNewComment({ text: "" });
      } else {
        console.error("Error creating comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div>
      <h1>Blog Posts</h1>

      {/* Display Blog Posts */}
      <div>
        {blogPosts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>

            {/* Display Comments */}
            <ul>
              {post.comments.map((comment) => (
                <li key={comment._id}>{comment.text}</li>
              ))}
            </ul>

            {/* Form to Add New Comment */}
            <form onSubmit={() => handleCreateComment(post._id)}>
              <label htmlFor="comment">Add Comment:</label>
              <input
                type="text"
                id="comment"
                value={newComment.text}
                onChange={(e) => setNewComment({ text: e.target.value })}
                required
              />
              <button type="submit">Add Comment</button>
            </form>
          </div>
        ))}
      </div>

      {/* Form to Add New Blog Post */}
      <form onSubmit={handleCreateBlogPost}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          required
        />
        <br />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          required
        ></textarea>
        <br />
        <button type="submit">Create Blog Post</button>
      </form>
    </div>
  );
};

export default BlogApp;
