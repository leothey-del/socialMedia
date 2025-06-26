import React, { useContext } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const fetchUserPosts = async (authorId) => {
  const response = await axios.get('/api/posts', {
    params: { authorId }
  });
  return response.data;
};

const MyFeed = () => {
  const { user } = useContext(AuthContext);

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['userPosts', user?._id],
    queryFn: () => fetchUserPosts(user._id),
    enabled: !!user && !!user._id, // Only run when user and user._id exist
  });

  if (!user || !user._id) {
    return <p>You must be logged in to see your feed.</p>;
  }

  if (isLoading) return <p>Loading your posts...</p>;
  if (isError) return <p>Failed to load your posts.</p>;

  return (
    <>
      {(posts && posts.length > 0) ? (
        posts.map((post) => (
          <Link key={post._id} to={`/post/${post._id}`}>
            <PostCard post={post} />
          </Link>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </>
  );
}
export default MyFeed;
