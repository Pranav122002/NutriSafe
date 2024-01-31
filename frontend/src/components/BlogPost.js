import React, { useState, useEffect } from 'react';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const BlogPost = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState({}); // Use an object to store comments for each post
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch blog posts on component mount
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/get-blogposts`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setBlogPosts(data);
      } else if (data && typeof data === 'object') {
        // If the response is an object, convert it to an array
        setBlogPosts(Object.values(data));
      } else {
        throw new Error('Invalid data format received from the server');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlogPost = async () => {
    try {
      setLoading(true);
      await fetch(`${API_BASE_URL}/create-blogpost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ title, content, userId: JSON.parse(localStorage.getItem("user"))._id }), // Replace with actual userId
      });

      // Fetch updated blog posts after creation
      fetchBlogPosts();
    } catch (error) {
      setError(error.message || 'An error occurred while creating a blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComment = async (postId) => {
    try {
      setLoading(true);
      await fetch(`${API_BASE_URL}/create-comment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ text: comments[postId], userId: JSON.parse(localStorage.getItem("user"))._id }), // Use the specific comment for the post
      });

      // Fetch updated blog posts after comment creation
      fetchBlogPosts();
    } catch (error) {
      setError(error.message || 'An error occurred while creating a comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Blog Posts</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Display blog posts */}
      {blogPosts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Posted by: {post.user.name}</p>
          {/* Display comments */}
          <ul>
            {post.comments.map((comment) => (
              <li key={comment._id}>{comment.text} - {comment.user.name}</li>
            ))}
          </ul>
          {/* Allow adding comments */}
          <input
            type="text"
            placeholder="Add a comment"
            value={comments[post._id] || ''}
            onChange={(e) => setComments({ ...comments, [post._id]: e.target.value })}
          />
          <button onClick={() => handleCreateComment(post._id)}>Add Comment</button>
        </div>
      ))}
      {/* Allow adding new blog posts */}
      <h2>Create a New Blog Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handleCreateBlogPost}>Create Blog Post</button>
    </div>
  );
};

export default BlogPost;
