import React from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom'; // Import useParams
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const fetchSinglePost= async (id) => {
    const response  = await axios.get(`http://localhost:5000/api/post/${id}`);

  return response.data;
};

const deletePost = async (id) => {
    return axios.delete(`http://localhost:5000/api/post/${id}`);
  };
  

const SinglePost = () => {

    const { id } = useParams();
    const navigate = useNavigate();


     const { data: posts, isLoading, isError } = useQuery({
        queryKey: ['singlePost', id],
        queryFn: () => fetchSinglePost(id),
      });
      
      const deleteMutation = useMutation({
        mutationFn: () => deletePost(id),
        onSuccess: () => {
            alert('Post deleted!');
            navigate('/myfeed');  // if using react-router's useNavigate
          },
          
      });
      
    
      if (isLoading) return <p>Loading your posts...</p>;
      if (isError) return <p>Failed to load your posts.</p>;
    

  return (
  <>
   <PostCard post={posts} showActions={true} onDelete={() => deleteMutation.mutate()}/>

  </>
  )
}

export default SinglePost