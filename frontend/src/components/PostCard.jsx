import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const PostCard = ({ post, showActions = false, onDelete  }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const isOwner = user?._id === post.author?._id;


  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 max-w-lg mx-auto relative">
      {/* 3 dots menu */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {/* Dropdown */}
      {showActions && isOwner && (
  <div className="absolute top-2 right-2">
    <button
      className="text-gray-500 hover:text-gray-700"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      ⋮
    </button>

    {menuOpen && (
      <div className="mt-2 bg-white border rounded shadow-lg py-1">
        <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
          Edit
        </button>
        <button onClick={onDelete} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
          Delete
        </button>
      </div>
    )}
  </div>
)}

      {/* Author and Timestamp */}
      <div className="flex items-center mb-2">
        <img
          src={post.author?.profilePicture || 'https://via.placeholder.com/40'}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <p className="font-semibold text-gray-800">{post.author?.username}</p>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-700 mb-3">{post.content}</p>

      {/* Media (if present) */}
      {post.media && (
        <img
          src={post.media}
          alt="Post media"
          className="w-full h-auto rounded-md mb-3"
        />
      )}

      {/* Likes and Comments */}
      <div className="flex justify-between items-center mb-2">
        <button className="text-gray-600 hover:text-red-500">
          ❤️ {post.likes.length} Likes
        </button>
        <button className="text-gray-600 hover:text-blue-500">
          💬 {post.comments.length} Comments
        </button>
      </div>

      {/* Comments Section */}
      <div className="border-t pt-2">
        {post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <div key={index} className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">{comment.author.username}: </span>
              {comment.text}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostCard;
