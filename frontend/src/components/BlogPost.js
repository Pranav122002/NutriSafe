import React, { useState, useEffect } from 'react';

const BlogApp = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newComment, setNewComment] = useState({ text: '' });

  // Fetch all blog posts on component mount
  useEffect(() => {
    fetch('/api/get-blogposts')
      .then(response => response.json())
      .then(data => setBlogPosts(data))
      .catch(error => console.error('Error fetching blog posts:', error));
  }, []);

  // Function to handle form submission for creating a new blog post
  const handleCreateBlogPost = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/create-blogpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.status === 201) {
        const newPostData = await response.json();
        setBlogPosts([...blogPosts, newPostData]);
        setNewPost({ title: '', content: '' });
      } else {
        console.error('Error creating blog post:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  // Function to handle form submission for creating a new comment
  const handleCreateComment = async (postId) => {
    try {
      const response = await fetch(`/api/create-comment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newComment.text }),
      });

      if (response.status === 201) {
        const updatedPostData = await response.json();
        // Update the blogPosts state to reflect the new comment
        setBlogPosts(blogPosts.map(post => (post._id === updatedPostData._id ? updatedPostData : post)));
        setNewComment({ text: '' });
      } else {
        console.error('Error creating comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div>
      <h1>Blog Posts</h1>

      {/* Display Blog Posts */}
      <div>
        {blogPosts.map(post => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            
            {/* Display Comments */}
            <ul>
              {post.comments.map(comment => (
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
                onChange={(e) => setNewComment({ text
