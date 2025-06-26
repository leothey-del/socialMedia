import React from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { useQuery } from '@tanstack/react-query';
import CreatePostForm from '../components/CreatePostForm';
import { Link } from 'react-router-dom';

const fetchAllPosts = async () => {
  const response = await axios.get('http://localhost:5000/api/posts');
  return response.data;
};

const Feed = () => {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['posts'],  // 🔑 Unique key for caching
    queryFn: fetchAllPosts,
    staleTime: 1000 * 60 * 5,  // (optional) cache fresh for 5 min
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Failed to load posts.</p>;

  return (
    <>
    <CreatePostForm/>
      {posts.map((post) => (
           <Link key={post._id} to={`/post/${post._id}`}>
             <PostCard key={post._id} post={post} />
        </Link>
      ))}
    </>
  );
};

export default Feed;
