import React, { useState, useEffect } from 'react';
// const CLOUD_NAME = process.env.CLOUD_NAME;
// const UPLOAD_PRESET = process.env.UPLOAD_PRESET;
const CLOUD_NAME = "pranav-cloud";
const UPLOAD_PRESET = "nutrisafe";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_BASE_URL = "http://localhost:5000/api"

const BlogPost = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState({}); // Use an object to store comments for each post
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [showComments, setShowComments] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  useEffect(() => {
    // Fetch blog posts on component mount
    fetchBlogPosts();
  }, []);

  useEffect(() => { if (url) { handleCreateBlogPost() } }, [url]);

  const postDetails = () => {
    console.log("image = ", image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("cloud_name", CLOUD_NAME);
    fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
    console.log(url);
  };

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };


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
        body: JSON.stringify({ title, content, image: url, userId: JSON.parse(localStorage.getItem("user"))._id }), // Replace with actual userId
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
      setComments({ ...comments, [postId]: '' });
      // Fetch updated blog posts after comment creation
      fetchBlogPosts();
    } catch (error) {
      setError(error.message || 'An error occurred while creating a comment');
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className=''>

      <div className='fixed rounded-lg shadow-xl h-96 -right-5 -bottom-5 z-40 bg-white mr-10 p-5 '>
        <img
          className='h-20 fixed right-10 bottom-10'
          src="./plus.png"
          alt=""
          onClick={handleToggle}
          style={{ cursor: 'pointer' }}
        />
        <div>
          {isVisible && (
            <div className='text-left '>
              <h2 className='text-left text-xl'>Create a New Blog Post</h2>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className='text-left'
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>

              
              <div className="main-div">
                <img
                  className='w-[20%]'
                  id="output"
                  src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    loadfile(event);
                    setImage(event.target.files[0]);
                  }}
                />
                <button
                id="post-btn"
                onClick={() => {
                  postDetails();
                }}
              >
                Submit
              </button>
              </div>
            </div>

          )}
        </div>
      </div>
      <div className='p-10 pt-20 w-4/6 ml-auto mr-40 '>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {/* Display blog posts */}
        <div className='mt-10'>
          {blogPosts.map((post) => (
            <div className='mt-10 relative' key={post._id}>
              <div className='flex '>
                <img className='w-10' src="./user.png" alt="" />
                <p className='font-lg text-xl ml-5 pt-1'>{post.user.name}</p>
              </div>
              <div className='border-2 rounded-md mt-2' >
                <h3 className='text-left pl-3 text-2xl font-rubik'>{post.title}</h3>
                <img className='mt-2 m-auto' src={post.image} alt="image" />


                <p className='text-xl text-left  p-3'>{post.content}</p>
              </div>
              <img
                className='w-10 m-2 ml-4'
                src="./chat.png"
                alt=""
                onClick={() => setShowComments({ ...showComments, [post._id]: !showComments[post._id] })}
              />
              {/* Display comments */}
              {/* <img className='w-10 m-2 ml-4' src="./chat.png " alt="" /> */}
              <div >
                {showComments[post._id] && (
                  <div className='compop absolute bottom-12 rounded-lg shadow-md h-[30rem] w-[100%] bg-white'>
                    <ul>
                      {post.comments.map((comment) => (
                        <>
                          <div className=' text-left m-3 flex'>
                            <img className='h-10 mt-1' src="./user.png" alt="" />
                            <div className='ml-4'>
                              <h1 className='text-xl' key={comment._id}>{comment.user.name}</h1>
                              <h1 key={comment._id}>{comment.text} </h1>
                            </div>
                          </div>

                        </>

                      ))}
                    </ul>
                    <div className='absolute flex bottom-5 left-[10%] w-[90%]'>
                      <input
                        className='w-[80%] border-2 rounded-md pl-4 h-10 '
                        type="text"
                        placeholder="Add a comment"
                        value={comments[post._id] || ''}
                        onChange={(e) => setComments({ ...comments, [post._id]: e.target.value })}
                      />
                      <img className='w-8 ml-2' onClick={() => handleCreateComment(post._id)} src="./send.png" alt="" />
                    </div>

                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
        {/* Allow adding new blog posts */}


      </div>
    </div>
  );
};

export default BlogPost;
