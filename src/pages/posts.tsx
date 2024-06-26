import { ArrowRight, ArrowLeft, Dot, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

import { PostProtocol } from '../interfaces/post-protocol';
import { filterPosts } from '../utils/filterPosts';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer';
import PostCard from '../components/post-card';
import axios from '../services/axios';
import CardSkeleton from '../components/card-skeleton';
import { Spinner } from '@chakra-ui/spinner';

export default function Posts() {
  const [posts, setPosts] = useState<PostProtocol[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostProtocol[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
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
  const filteredCurrentPosts = filteredPosts.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    numbersOfPage.push(i);
  }

  return (
    <>
      <Navbar />

      <div
        style={{ minHeight: '45vh' }}
        className="lg:p-0 p-12 lg:flex w-full items-center justify-center rounded-b-lg bg-gradient-to-br from-blue-500 via-blue-400 to-blue-400"
      >
        <div className="lg:w-1/2 flex flex-col  items-center justify-center">
          <h1 className="font-poppins lg:mt-0 mt-4 lg:text-6xl text-4xl text-white mb-8">
            Postagens
          </h1>
          <h1 className="lg:text-xl font-poppins text-center mb-4 text-white">
            Aqui, você pode visualizar as postagens da comunidade.
          </h1>
        </div>

        <div className="lg:w-1/2 gap-6 flex flex-col items-center justify-center">
          <h1 className="lg:text-xl font-poppins text-sm text-white">
            Em busca de alguma postagem?
          </h1>
          <div className="flex flex-col lg:flex-row lg:gap-6 gap-2  items-center justify-center">
            <input
              onChange={(e) => setQuery(e.target.value)}
              className="pr-3 lg:w-fit w-56  pl-6 rounded-md placeholder-gray-500 text-black border border-gray-400 focus:border-blue-400 transition-all outline-none p-2 "
              type="text"
              placeholder="Nome do post"
            />
            <button
              type="submit"
              onClick={() => {
                console.log(
                  filterPosts(query, posts, setFilteredPosts, setIsLoading),
                );
                query.length > 0 ? setIsFiltering(true) : setIsFiltering(false);
              }}
              className="font-poppins flex items-center justify-center  gap-4   lg:w-32 w-56 p-2 font-medium transition-all bg-white rounded-md"
            >
              {isLoading ? (
                <Spinner boxSize="22px" color="black" />
              ) : (
                <>
                  <Search size={20} />
                  Buscar
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-8 items-center justify-center lg:grid grid-cols-3 lg:m-20 gap-y-10">
        {posts && posts.length > 0 ? (
          isFiltering ? (
            filteredCurrentPosts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))
          ) : (
            currentPosts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))
          )
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
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
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
              if (currentPage <= numbersOfPage.length - 1) {
                setCurrentPage(currentPage + 1);
              }
            }}
            className="text-blue-400 cursor-pointer size-8 hover:text-black"
          />
        </div>
      )}
      <Footer />
    </>
  );
}
