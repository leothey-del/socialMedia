import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const BlogPostForm = () => {

const { user} = useContext(AuthContext);

  const [inputPost, setInputPost] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate inputs
    if ( !inputPost.content.trim()) {
      setError("Title and content are required");
      return;
    }
    
    if (inputPost.content.length < 10) {
      setError("Content must be at least 10 characters long");
      return;
    }

    const payload = {
      user: user.username,
      content: inputPost.content,
    };

    console.log("Sending payload:", payload); // Debug payload

    try {
      const response = await axios.post("http://localhost:5000/api/post", payload);
      setSuccess("Blog post added successfully!");
      setInputPost({ user: "", content: "" });
      console.log("Response:", response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to create blog post";
      setError(errorMessage);
      console.error("Backend error:", err.response?.data); // Log full error response
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          {/* userName */}
          <input
            id="title"
            name="title"
          
            onChange={handleChange}
            className="hidden  md:hidden"
            placeholder={user?.username}
            aria-required="true"
          />
          {/* userName */}
         
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={inputPost.content}
            onChange={handleChange}
            className="mt-1 w-full rounded-md p-2 border border-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="Enter content"
            rows="5"
            aria-required="true"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogPostForm;