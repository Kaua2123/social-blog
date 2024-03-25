import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MessageCircle, Share, User } from 'lucide-react';

import axios from '../services/axios';
import Navbar from '../components/navbar';
import noImg from '../imgs/no-img.png';
import PostCard from '../components/post-card';
import { PostProtocol } from '../interfaces/post-protocol';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState<PostProtocol>();
  const [posts, setPosts] = useState<PostProtocol[]>([]);

  useEffect(() => {
    const getPost = async () => {
      await axios
        .get(`/post/${id}`)
        .then((response) => setPost(response.data))
        .catch((e) => console.log(e));
    };

    getPost();
  }, [id]);

  useEffect(() => {
    const getPosts = async () => {
      await axios
        .get(`/post`)
        .then((response) => setPosts(response.data))
        .catch((e) => console.log(e));
    };

    getPosts();
  }, []);

  const relatedPosts: PostProtocol[] = [];

  posts.map((post) =>
    relatedPosts.length < 3 ? relatedPosts.push(post) : relatedPosts,
  );

  console.log(post);

  return (
    <>
      <Navbar />
      {post ? (
        <>
          <div className="">
            <div className="m-20 flex flex-col gap-14 items-center h-auto">
              <h1 className="text-5xl text-center font-poppins font-bold text-blue-400">
                {post.title}
              </h1>
              <img
                className="rounded-2xl shadow-2xl"
                style={{ width: '420px', height: '300px' }}
                src={post.image ? post.image_url : noImg}
                alt=""
              />
              <div className="text-lg" style={{ width: '450px' }}>
                <p>{post.content}</p>
              </div>
              <div className="flex flex-row gap-16 items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <Heart
                    size={30}
                    cursor="pointer"
                    className="hover:text-red-400 visited:text-red-400"
                  />
                  <p>{post.likes}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Share
                    size={30}
                    cursor="pointer"
                    className="hover:text-blue-400 visited:text-blue-400"
                  />
                  {/* valor abaixo ficticio */}
                  <p>2</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <MessageCircle
                    size={30}
                    cursor="pointer"
                    className="hover:text-gray-400 visited:text-gray-400"
                  />
                  {/* valor abaixo ficticio */}
                  <p>2</p>
                </div>
              </div>
            </div>
          </div>
          <div className="m-28 flex flex-row gap-8 items-center">
            <div>
              {post.User.image ? (
                <img
                  className="rounded-2xl shadow-lg w-36"
                  src={post.User.image_url}
                  alt=""
                />
              ) : (
                <User size={90} />
              )}
            </div>
            <div className="font-poppins text-4xl">
              <h1>O autor</h1>
              <h1 className="font-bold text-blue-400">
                {post.User.username ? post.User.username : 'Nome do Autor'}
              </h1>
            </div>
          </div>
          <div className="m-28 gap-8 items-center">
            <h1 className="mb-14 font-poppins font-bold text-blue-400 text-4xl">
              Pode te interessar:
            </h1>
            <div className="flex flex-row items-center justify-center gap-8">
              {relatedPosts.map((post) => (
                <>
                  <PostCard key={post.id} post={post} />
                </>
              ))}
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-5xl font-poppins">
          Ops! Parece que o post não foi encontrado.
        </h1>
      )}
    </>
  );
}
