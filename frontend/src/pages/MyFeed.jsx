import React, { useContext } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const fetchUserPosts = async (authorId) => {
  const response = await axios.get('http://localhost:5000/api/post', {
    params: { authorId }
  });
  return response.data;
};

const MyFeed = () => {
  const { user } = useContext(AuthContext);

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['userPosts', user._id],  
    queryFn: () => fetchUserPosts(user._id),
    enabled: !!user?._id,  // Only run when user._id is available
  });

  if (isLoading) return <p>Loading your posts...</p>;
  if (isError) return <p>Failed to load your posts.</p>;

  return (
    <>
  
      {posts.map((post) => (
        <Link key={post._id} to={`/post/${post._id}`}>
        <PostCard post={post} />
        </Link>
      ))}


    </>
  );
};

export default MyFeed;
