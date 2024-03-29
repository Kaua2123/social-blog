import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import PostCard from '../components/post-card';
import { PostProtocol } from '../interfaces/post-protocol';
import axios from '../services/axios';
import { FileText, Tags, Text } from 'lucide-react';
import { tokenDecoder } from '../utils/tokenDecoder';
import Loader from '../components/loader';

export default function MyPosts() {
  const [posts, setPosts] = useState<PostProtocol[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //   const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem('token');
  const decodedToken = tokenDecoder(token);

  useEffect(() => {
    const getUserPosts = async () => {
      await axios
        .get(`/userPosts/${decodedToken?.id}`)
        .then((response) => {
          setPosts(response.data);
          setIsLoading(false);
        })
        .catch((e) => console.log(e));
    };

    getUserPosts();
  });

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <>
          <Navbar />
          <div
            style={{ height: '34vh' }}
            className="flex flex-col w-full items-center justify-center rounded-b-lg bg-gradient-to-br from-blue-500 via-blue-400 to-blue-400"
          >
            <h1 className="font-poppins text-6xl text-white mb-8">
              Meus posts
            </h1>
            <h1 className="text-xl text-white">
              Crie, edite, delete e visualize seus próprios posts. Faça parte
              dessa comunidade!
            </h1>
          </div>

          <div className="flex flex-row p-32">
            <div className="w-1/2">
              <form action="">
                <>
                  <label htmlFor="" className="block">
                    Título
                  </label>
                  <div className="relative flex items-center text-gray-400 focus-within:text-blue-400">
                    <FileText className="absolute w-5 h-5 ml-4 mt-2.5 pointer-events-none" />
                    <input
                      className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border border-gray-400 focus:border-blue-400 transition-all outline-none mt-3 p-2 "
                      type="text"
                      name=""
                      id=""
                      placeholder="Seu nome"
                    />
                  </div>
                  <label htmlFor="" className="block">
                    Conteúdo
                  </label>
                  <div className="relative flex items-center text-gray-400 focus-within:text-blue-400">
                    <Text className="absolute w-5 h-5 ml-4 mt-2.5 pointer-events-none" />
                    <textarea
                      className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border border-gray-400 focus:border-blue-400 transition-all outline-none mt-3 p-2 "
                      name=""
                      id=""
                      placeholder="Conteúdo do post"
                    />
                  </div>
                </>

                <label htmlFor="" className="block mt-2">
                  Tags
                </label>
                <div className="relative flex items-center text-gray-400 focus-within:text-blue-400">
                  <Tags className="absolute w-5 h-5 ml-4 mt-2.5 " />
                  <input
                    className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border mt-3 border-gray-400 focus:border-blue-400 transition-all outline-none p-2"
                    type="email"
                    name=""
                    id=""
                    placeholder="Tags do post"
                  />
                </div>

                <button
                  type="button"
                  className="hover:opacity-85 mt-8 font-poppins font-medium text-white w-full shadow-blue-400 transition-all bg-blue-400 rounded-md p-2"
                >
                  Criar
                </button>
              </form>
            </div>

            <div className="w-1/2 flex flex-col justify-center items-center">
              <h1 className="font-poppins text-6xl mb-8">Criar post</h1>
              <h1 className="font-poppins text-xl ">
                Preencha todos os campos
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-3 m-20 gap-y-10">
            {posts && posts.length > 0 ? (
              posts.map((post, index) => <PostCard key={index} post={post} />)
            ) : (
              <>
                <h1 className="text-blue-400 font-poppins text-3xl mb-20 flex items-center justify-center">
                  Parece que você não realizou nenhuma postagem.
                </h1>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
