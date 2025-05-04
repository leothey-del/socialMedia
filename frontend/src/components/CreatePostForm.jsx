import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const CreatePostForm = () => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState('');
  const { user } = useContext(AuthContext);  // 👈 Get logged-in user

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('Post content cannot be empty!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/post', {
        author: user._id,    // ✅ Send user ID as 'author'
        content,
        media,
      });

      console.log('Post created:', response.data);
       // Add new post to feed (optional)
    //   onPostCreate(response.data);  

      // Clear form
      setContent('');
      setMedia('');
    } catch (err) {
      console.error('Failed to create post:', err);
      alert('Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 mb-6 max-w-lg mx-auto">
      <textarea
        className="w-full p-2 border rounded-md mb-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      ></textarea>
      <input
        type="text"
        className="w-full p-2 border rounded-md mb-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Optional: Image URL"
        value={media}
        onChange={(e) => setMedia(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Post
      </button>
    </form>
  );
};

export default CreatePostForm;
