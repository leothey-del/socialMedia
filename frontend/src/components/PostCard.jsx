import React, { useState, useContext } from 'react';
import { MoreVertical } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const PostCard = ({ post, showActions = false, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const isOwner = user?._id === post.author?._id;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 shadow-xl rounded-2xl p-6 mb-6 max-w-2xl mx-auto relative transition-transform hover:scale-[1.02] hover:shadow-2xl">
      {/* 3 dots menu */}
      {showActions && isOwner && (
        <div className="absolute top-4 right-4 z-10">
          <button
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MoreVertical className="w-6 h-6" />
          </button>
          {menuOpen && (
            <div className="mt-2 bg-white border rounded-xl shadow-lg py-2 w-32 animate-fade-in">
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left rounded-t-xl">Edit</button>
              <button onClick={onDelete} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left rounded-b-xl">Delete</button>
            </div>
          )}
        </div>
      )}

      {/* Author and Timestamp */}
      <div className="flex items-center mb-4">
        <img
          src={post.author?.profilePicture || 'https://via.placeholder.com/40'}
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-purple-300 shadow-sm mr-3 object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900 text-lg">{post.author?.username}</p>
          <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mb-4 text-base leading-relaxed whitespace-pre-line">{post.content}</p>

      {/* Media (if present) */}
      {post.media && (
        <div className="mb-4">
          <img
            src={post.media}
            alt="Post media"
            className="w-full max-h-96 object-cover rounded-xl border border-gray-200 shadow-md"
          />
        </div>
      )}

      {/* Likes and Comments */}
      <div className="flex justify-between items-center mb-4">
        <button className="flex items-center gap-1 text-gray-600 hover:text-pink-500 font-medium transition">
          <span role="img" aria-label="like">❤️</span> {post.likes.length} <span className="hidden sm:inline">Likes</span>
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 font-medium transition">
          <span role="img" aria-label="comment">💬</span> {post.comments.length} <span className="hidden sm:inline">Comments</span>
        </button>
      </div>

      {/* Comments Section */}
      <div className="border-t pt-3">
        {post.comments.length > 0 ? (
          <div className="space-y-2">
            {post.comments.map((comment, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                <img
                  src={comment.author?.profilePicture || 'https://via.placeholder.com/24'}
                  alt="Comment author"
                  className="w-6 h-6 rounded-full object-cover border border-gray-200"
                />
                <span className="font-semibold text-purple-700">{comment.author.username}:</span>
                <span>{comment.text}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostCard;
