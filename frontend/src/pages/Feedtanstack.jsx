import React from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { useInfiniteQuery } from '@tanstack/react-query';  // Correct import for React Query v5
import CreatePostForm from '../components/CreatePostForm';
import { Link } from 'react-router-dom';

// Fetch function for infinite scrolling
const fetchAllPosts = async ({ pageParam = 1 }) => {
  const response = await axios.get('http://localhost:5000/api/post', {
    params: { page: pageParam, limit: 6 },  // Pagination params (page and limit)
  });
  console.log('API Response:', response.data); // Log the response to check the structure
  return {
    posts: response.data,   // Adjust the structure here
    nextPage: pageParam + 1, // For infinite scroll, you should update this logic as per your API response
  };
};

const Feed = () => {
  // Use React Query's useInfiniteQuery hook
  const {
    data, 
    isLoading, 
    isError, 
    error, 
    hasNextPage, 
    fetchNextPage, 
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['posts'],  // Unique key for caching and refetching
    queryFn: fetchAllPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,  // Logic to fetch the next page
  });

  // Loading and error states
  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Failed to load posts. Error: {error.message}</p>;

  // Ensure data.pages is defined before calling map
  const pages = data?.pages || [];  // Default to an empty array if undefined

  return (
    <>
      <CreatePostForm />  {/* Form for creating new posts */}
      
      {/* Display posts */}
      {pages.length > 0 ? (
        pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.posts.map((post) => (
              <Link key={post._id} to={`/post/${post._id}`}>
                <PostCard post={post} />
              </Link>
            ))}
          </React.Fragment>
        ))
      ) : (
        <p>No posts available</p> 
      )}

      {/* Load more button */}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full py-2 bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </>
  );
};

export default Feed;
