import { ArrowRight, ArrowLeft, Dot } from 'lucide-react';
import { useEffect, useState } from 'react';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import PostCard from '../components/post-card';
import axios from '../services/axios';
import { PostProtocol } from '../interfaces/post-protocol';
import CardSkeleton from '../components/card-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
        {posts && posts.length > 0 ? (
          currentPosts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))
        ) : (
          <>
            {Array.from({ length: 9 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </>
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
      <Footer />
    </>
  );
}
