import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const Blog = () => {

  const [blogPost, setBlogPost] = useState([]);
  
  

  return (
    <div className="  min-h-screen  text-white py-12">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <div>
        <button className="bg-blue-600 rounded-lg p-2 border-lg my-3 hover:bg-blue-700">
          <Link to="/post" className="font-bold text-sm">
            Create new post{" "}
          </Link>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="border border-gray-400 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Blog Post Title</h2>
          <p className="mt-2">This is a brief description of the blog post.</p>
          <a href="" className="text-blue-500 underline">
            Read more
          </a>
        </div>

        <div className="bg-white text-black p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Another Blog Post Title</h2>
          <p className="mt-2">
            This is another brief description of the blog post.
          </p>
          <a href="" className="text-blue-500 underline">
            Read more
          </a>
        </div>

        <div className="bg-white text-black p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Another Blog Post Title</h2>
          <p className="mt-2">
            This is another brief description of the blog post.
          </p>
          <a href="" className="text-blue-500 underline">
            Read more
          </a>
        </div>

        <div className="bg-white text-black p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Another Blog Post Title</h2>
          <p className="mt-2">
            This is another brief description of the blog post.
          </p>
          <a href="" className="text-blue-500 underline">
            Read more
          </a>
        </div>
      </div>


      
    </div>
  );
};

export default Blog;
