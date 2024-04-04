import { useEffect, useState } from 'react';
import { FileText, Tags, Text } from 'lucide-react';
import toast from 'react-hot-toast';

import { tokenDecoder } from '../utils/tokenDecoder';
import axios from '../services/axios';
import { PostProtocol } from '../interfaces/post-protocol';
import PostCard from '../components/post-card';
import Loader from '../components/loader';
import Navbar from '../components/navbar';

export default function MyPosts() {
  const [posts, setPosts] = useState<PostProtocol[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  //   const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem('token');
  const decodedToken = tokenDecoder(token);

  useEffect(() => {
    const getUserPosts = async () => {
      if (!token)
        return toast.error(
          'Você deve estar logado para visualizar suas próprias postagens.',
        );

      axios.defaults.headers.Authorization = `Bearer ${token}`;

      await axios
        .get(`/userPosts/${decodedToken?.id}`)
        .then((response) => {
          setPosts(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
        });
    };

    getUserPosts();
  });

  const createPost = async () => {
    if (!token)
      return toast.error('Você deve estar logado para criar postagens.');
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const user_id = decodedToken?.id;
    setIsLoading(true);
    await axios
      .post('/post/create', { title, content, image, tags, user_id })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        toast.success('Post criado com sucesso.');
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.error('Erro ao criar post.');
      });
  };

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
                      onChange={(e) => setTitle(e.target.value)}
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
                      onChange={(e) => setContent(e.target.value)}
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
                    onChange={(e) => setTags(e.target.value)}
                    className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border mt-3 border-gray-400 focus:border-blue-400 transition-all outline-none p-2"
                    type="text"
                    name=""
                    id=""
                    placeholder="Tags do post"
                  />
                </div>

                <button
                  onClick={createPost}
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
