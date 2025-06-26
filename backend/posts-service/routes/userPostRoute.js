const express = require('express');
const router = express.Router();
const UserPost = require('../models/UserPost');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const { authorId } = req.query;
    const query = authorId ? { author: authorId } : {};

    const posts = await UserPost.find(query)
      .populate('author', 'username profilePicture')
      .populate('comments.author', 'username profilePicture')
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error in GET /api/posts:", err); // Log error to terminal
    res.status(500).json({ message: err.message });
  }
});

// GET a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await UserPost.findById(req.params.id)
      .populate('author', 'username profilePicture')
      .populate('comments.author', 'username profilePicture');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
    console.log('found id ',post)
    } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new post
router.post('/', async (req, res) => {
  const { author, content,media } = req.body;

  const newPost = new UserPost({
    author,
    content,
    media,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a post by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await UserPost.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a post by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await UserPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
