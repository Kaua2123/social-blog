import { useState } from 'react';
import { ArrowRight, ArrowLeft, Dot } from 'lucide-react';

import Navbar from '../components/navbar';
import PostCard from '../components/post-card';

export default function Posts() {
  const postsPerPage = useState(5);
  const page = useState(1);

  return (
    <>
      <Navbar />
      <div className=" grid grid-cols-3 m-20 gap-y-10">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
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
