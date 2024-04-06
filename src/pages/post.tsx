import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Dot,
  Heart,
  MessageCircle,
  ShareIcon,
  User,
} from 'lucide-react';

import axios from '../services/axios';
import noImg from '../imgs/no-img.png';
import { formatDate } from '../utils/formatDate';

import { PostProtocol } from '../interfaces/post-protocol';

import Navbar from '../components/navbar';
import PostCard from '../components/post-card';
import Footer from '../components/footer';
import Comments from '../components/comments/comments';
import Tags from '../components/tags';
import Loader from '../components/loader';
import { tokenDecoder } from '../utils/tokenDecoder';
import toast from 'react-hot-toast';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState<PostProtocol>();
  const [posts, setPosts] = useState<PostProtocol[]>([]);
  const [isLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postDate = formatDate(post?.created_at);
  const relatedPosts: PostProtocol[] = [];
  const token = localStorage.getItem('token');
  const decodedToken = tokenDecoder(token);

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

  const sharePost = () => {
    navigator.clipboard
      .writeText(`Veja meu post em http://localhost:5173/${id}`)
      .then(() => {
        toast.success('Link do Post copiado para compartilhamento');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const likePost = async () => {
    axios.defaults.headers.Authorization = `Bearer ${token}`;

    await axios
      .put(`post/like/${post?.id}/${decodedToken?.id}`)
      .then((response) => {
        console.log(response);
        toast.success('Você curtiu a postagem.');
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data);
      });
  };

  posts.map((postArray) =>
    postArray.tags == post?.tags && postArray.id != post.id
      ? relatedPosts.push(postArray)
      : relatedPosts,
  );

  const postsPerPage = 3;
  const numbersOfPage = [];
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = relatedPosts.slice(indexOfFirstPost, indexOfLastPost);

  for (let i = 1; i <= Math.ceil(relatedPosts.length / postsPerPage); i++) {
    numbersOfPage.push(i);
  }

  return (
    <>
      <Navbar />
      {post ? (
        <>
          <div className="">
            <div className="m-20 flex flex-col gap-14 items-center h-auto">
              <div className="flex flex-col gap-8">
                <div className="flex flex-row items-center justify-center gap-8">
                  <p className="text-gray-500 flex gap-3">
                    <Calendar />
                    {postDate}
                  </p>
                  <Tags tags={post.tags} />
                </div>
                <h1 className="text-5xl text-center font-poppins font-bold text-blue-400">
                  {post.title}
                </h1>
              </div>

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
                  <button onClick={likePost}>
                    <Heart
                      size={30}
                      cursor="pointer"
                      className="hover:text-red-400 visited:text-red-400"
                    />
                  </button>

                  <p>{post.likes}</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <MessageCircle size={30} className="hover:text-gray-400" />

                  <p>{post.Comments.length}</p>
                </div>

                <div className="">
                  <button
                    type="submit"
                    onClick={() => sharePost()}
                    className=" flex gap-6 font-poppins hover:opacity-85 w-48 font-medium text-white  transition-all bg-blue-400 rounded-md p-3"
                  >
                    Compartilhar
                    <ShareIcon cursor="pointer" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="m-28 flex flex-row gap-8 items-center">
            <div>
              {post.User && post.User.image ? (
                <img
                  className="rounded-2xl shadow-lg w-36 h-36"
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
                {post.User && post.User.name ? post.User.name : 'Nome do Autor'}
              </h1>
            </div>
          </div>
          <div className="m-28 gap-8 items-center">
            <h1 className="mb-14 font-poppins font-bold text-blue-400 text-4xl">
              Pode te interessar:
            </h1>
            <div className="flex flex-row items-center justify-center gap-8">
              <div className="flex flex-col">
                <div className="flex gap-20">
                  {relatedPosts.length > 0 ? (
                    currentPosts.map((post) => (
                      <>
                        <PostCard key={post.id} post={post} />
                      </>
                    ))
                  ) : (
                    <h1 className="text-blue-400 mt-8 font-poppins text-3xl mb-20 flex items-center justify-center">
                      Parece que não há posts relacionados com esse. Continue
                      postando!
                    </h1>
                  )}
                </div>
                <div>
                  {relatedPosts.length > 0 && (
                    <div className="shadow-sm shadow-gray-300 flex justify-center items-center rounded-xl  m-24 h-20">
                      <ArrowLeft
                        onClick={() => {
                          numbersOfPage.length <= currentPage
                            ? setCurrentPage(currentPage - 1)
                            : currentPage;
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
                          numbersOfPage.length > currentPage
                            ? setCurrentPage(currentPage + 1)
                            : currentPage;
                        }}
                        className="text-blue-400 cursor-pointer size-8 hover:text-black"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Comments comments={post.Comments} post_id={post.id} />
        </>
      ) : (
        <Loader isLoading={isLoading} />
      )}
      <Footer />
    </>
  );
}
