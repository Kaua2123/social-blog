import { ArrowRight, ArrowLeft, Dot } from 'lucide-react';

import Navbar from '../components/navbar';
import PostCard from '../components/post-card';
import { useEffect, useState } from 'react';
import axios from '../services/axios';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      await axios
        .get('/post')
        .then((response) => setPosts(response.data))
        .catch((e) => console.log(e));
    };

    getPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 m-20 gap-y-10">
        {posts ? (
          posts.map((_, index) => (
            // eslint-disable-next-line react/jsx-key
            <PostCard key={index} />
          ))
        ) : (
          <h1 className="font-bold font-poppins">
            Parece que não há posts disponíveis...
          </h1>
        )}
      </div>
      <div className="shadow-sm shadow-gray-300 flex justify-center items-center rounded-xl  m-24 h-20">
        <ArrowLeft className="text-blue-400 cursor-pointer size-8 hover:text-black" />
        <Dot className="text-blue-400 cursor-pointer size-8 hover:text-black" />
        <Dot className="text-blue-400 cursor-pointer size-8 hover:text-black" />
        <Dot className="text-blue-400 cursor-pointer size-8 hover:text-black" />
        <Dot className="text-blue-400 cursor-pointer size-8 hover:text-black" />
        <Dot className="text-blue-400 cursor-pointer size-8 hover:text-black" />
        <ArrowRight className="text-blue-400 cursor-pointer size-8 hover:text-black" />
      </div>
    </>
  );
}
