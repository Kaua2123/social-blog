import { ArrowRight, ArrowLeft, Dot } from 'lucide-react';

import Navbar from '../components/navbar';
import PostCard from '../components/post-card';
import { useEffect, useState } from 'react';
import axios from '../services/axios';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      await axios
        .get('/post')
        .then((response) => setPosts(response.data))
        .catch((e) => console.log(e));
    };

    getPosts();
  }, []);

  const postsPerPage = 3;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 m-20 gap-y-10">
        {posts ? (
          currentPosts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))
        ) : (
          <h1 className="font-bold font-poppins">
            Parece que não há posts disponíveis...
          </h1>
        )}
      </div>
      <div className="shadow-sm shadow-gray-300 flex justify-center items-center rounded-xl  m-24 h-20">
        <ArrowLeft
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
          className="text-blue-400 cursor-pointer size-8 hover:text-black"
        />
        <Dot className="text-blue-400 cursor-pointer size-8 hover:text-black" />
        <Dot className="text-blue-400 cursor-pointer size-8 hover:text-black" />
        <Dot className="text-blue-400 cursor-pointer size-8 hover:text-black" />
        <Dot className="text-blue-400 cursor-pointer size-8 hover:text-black" />
        <Dot className="text-blue-400 cursor-pointer size-8 hover:text-black" />
        <ArrowRight
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          className="text-blue-400 cursor-pointer size-8 hover:text-black"
        />
      </div>
    </>
  );
}
