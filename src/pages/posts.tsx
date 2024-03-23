import { ArrowRight, ArrowLeft, Dot } from 'lucide-react';

import Navbar from '../components/navbar';
import PostCard from '../components/post-card';
import { useEffect, useState } from 'react';
import axios from '../services/axios';
import { PostProtocol } from '../interfaces/post-protocol';

export default function Posts() {
  const [posts, setPosts] = useState<PostProtocol[]>([]);
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

  const postsPerPage = 9;
  const numbersOfPage = [];
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    numbersOfPage.push(i);
  }

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 m-20 gap-y-10">
        {posts.length > 0 ? (
          currentPosts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))
        ) : (
          <div className=" items-center w-full justify-center">
            <h1 className="font-bold text-5xl text-blue-400 font-poppins">
              Parece que não há posts disponíveis...
            </h1>
          </div>
        )}
      </div>
      {posts.length > 0 && (
        <div className="shadow-sm shadow-gray-300 flex justify-center items-center rounded-xl  m-24 h-20">
          <ArrowLeft
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
            className="text-blue-400 cursor-pointer size-8 hover:text-black"
          />
          {numbersOfPage.map((pageNumber) => (
            <Dot
              onClick={() => {
                setCurrentPage(pageNumber);
              }}
              key={pageNumber}
              className="text-blue-400 cursor-pointer size-8 hover:text-black"
            />
          ))}
          <ArrowRight
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
            className="text-blue-400 cursor-pointer size-8 hover:text-black"
          />
        </div>
      )}
    </>
  );
}
