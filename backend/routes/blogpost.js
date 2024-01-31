const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const BlogPost = mongoose.model("BLOGPOST");
const User = mongoose.model("USER");
const auth_checker = require("../middlewares/auth");

router.post("/api/create-blogpost", auth_checker, async (req, res) => {
  try {
    const { title, content, userId } = req.body;
   
    console.log("req = ", userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newBlogPost = new BlogPost({
      title,
      content,
      user: userId,
    });

    const savedPost = await newBlogPost.save();
    return res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/get-blogposts", auth_checker, async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    // const blogPosts = await BlogPost.find().populate("user", [
    //   "title",
    //   "content",
    // ]);

    res.status(200).json(blogPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/api/create-comment/:postId", auth_checker, async (req, res) => {
  try {
    const { text, userId } = req.body;
    const postId = req.params.postId;

    console.log("req.body", req.body);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const blogPost = await BlogPost.findById(postId);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const newComment = {
      text,
      user: userId,
    };

    blogPost.comments.push(newComment);
    await blogPost.save();

    res.status(201).json(blogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
