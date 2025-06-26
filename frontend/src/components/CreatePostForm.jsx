import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const CreatePostForm = () => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('Post content cannot be empty!');
      return;
    }
    try {
      const response = await axios.post('/api/posts', {
        author: user._id,
        content,
        media,
      });
      console.log('Post created:', response.data);
      setContent('');
      setMedia('');
      setModalOpen(false);
    } catch (err) {
      console.error('Failed to create post:', err);
      alert('Something went wrong!');
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <div
        className="bg-white shadow-md rounded-lg p-4 mb-6 max-w-lg mx-auto cursor-pointer hover:bg-blue-50 transition"
        onClick={() => setModalOpen(true)}
      >
        <div className="flex items-center">
          <img
            src={user?.profilePicture || 'https://via.placeholder.com/40'}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3 object-cover border border-gray-200"
          />
          <span className="text-gray-500">What's on your mind?</span>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-30 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-auto relative animate-fade-in border border-blue-100">
            <button
              className="absolute top-3 right-3 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-400 text-2xl font-bold shadow focus:outline-none transition"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            >
              ×
            </button>
            <div className="flex items-center mb-4">
              <img
                src={user?.profilePicture || 'https://via.placeholder.com/40'}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3 object-cover border border-gray-200"
              />
              <span className="font-semibold text-gray-700 text-lg">{user?.username || 'User'}</span>
            </div>
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full p-3 border rounded-2xl mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-lg min-h-[100px] bg-gray-50"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                autoFocus
                maxLength={300}
              ></textarea>
              <input
                type="text"
                className="w-full p-2 border rounded-2xl mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                placeholder="Optional: Image URL (jpg, png, gif)"
                value={media}
                onChange={(e) => setMedia(e.target.value)}
                pattern="https?://.*\.(jpg|jpeg|png|gif)"
                title="Please enter a valid image URL (jpg, png, gif)"
              />
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-400">{content.length}/300</span>
                {media && (
                  <img src={media} alt="Preview" className="w-14 h-14 object-cover rounded-lg border border-gray-200" onError={e => e.target.style.display='none'} />
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-2xl hover:bg-blue-600 transition w-full text-lg font-semibold shadow-md"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePostForm;
