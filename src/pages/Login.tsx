import { Mail, User, LockKeyhole, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import login from '../imgs/svg/blog-post-logincadastro.svg';
import axios from '../services/axios';
import Loader from '../components/loader';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const postUser = async () => {
    setIsLoading(true);

    if (!name || !username || !email || !password) {
      setIsLoading(false);
      return toast.error('Preencha todos os campos');
    }

    if (password.length < 3 || password.length > 24) {
      setIsLoading(false);
      return toast.error(
        'Senha deve ter entre 3 e 24 caracteres para uma maior segurança',
      );
    }

    await axios
      .post('/user/post', { name, username, email, password })
      .then(() => {
        setIsLogin(true);
        toast.success('Cadastrado com sucesso.');
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        if (error.response.status == '500')
          toast.error('Ocorreu um erro ao se cadastrar');
      });
  };

  const loginUser = async () => {
    setIsLoading(true);

    if (!email || !password) return toast.error('Preencha todos os campos');

    await axios
      .post('/login', { email, password })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        toast.success('Você entrou na conta.');

        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        toast.error('Ocorreu um erro ao entrar na conta.');
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <>
          <div className="absolute top-0 p-8">
            <button
              onClick={() => {
                navigate('/');
              }}
              className="hover:opacity-85  flex gap-4 font-poppins font-medium text-white w-full shadow-blue-400 transition-all bg-blue-400 rounded-md p-3"
            >
              <ArrowLeft className="text-white" />
              <p className="text-white">Voltar</p>
            </button>
          </div>
          <section className="h-full w-full">
            <div className="flex flex-row">
              <div className="w-1/2 p-20">
                <img src={login} className="size-full" alt="" />
              </div>

              <div className="w-1/2 p-36">
                <div className="mb-8">
                  <h1 className="font-poppins text-4xl font-bold text-blue-400">
                    <p>Vamos começar.</p>
                  </h1>
                  <div className="flex flex-row gap-2">
                    {!isLogin && <p>Já tem uma conta? </p>}
                    {isLogin && <p>Não está cadastrado? </p>}
                    <button
                      onClick={() => {
                        setIsLogin(!isLogin);
                      }}
                      className="font-medium  text-blue-400 hover:opacity-85"
                    >
                      {!isLogin && <p>Entre agora</p>}
                      {isLogin && <p>Criar conta</p>}
                    </button>
                  </div>
                </div>

                <form action="">
                  {!isLogin && (
                    <>
                      <label htmlFor="" className="block">
                        Nome Completo
                      </label>
                      <div className="relative flex items-center text-gray-400 focus-within:text-blue-400">
                        <User className="absolute w-5 h-5 ml-4 mt-2.5 pointer-events-none" />
                        <input
                          onChange={(e) => setName(e.target.value)}
                          className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border border-gray-400 focus:border-blue-400 transition-all outline-none mt-3 p-2 "
                          type="text"
                          name=""
                          id=""
                          placeholder="Seu nome"
                        />
                      </div>
                      <label htmlFor="" className="block">
                        Apelido
                      </label>
                      <div className="relative flex items-center text-gray-400 focus-within:text-blue-400">
                        <User className="absolute w-5 h-5 ml-4 mt-2.5 pointer-events-none" />
                        <input
                          onChange={(e) => setUsername(e.target.value)}
                          className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border border-gray-400 focus:border-blue-400 transition-all outline-none mt-3 p-2 "
                          type="text"
                          name=""
                          id=""
                          placeholder="Como quer ser chamado"
                        />
                      </div>
                    </>
                  )}

                  <label htmlFor="" className="block mt-2">
                    Endereço de Email
                  </label>
                  <div className="relative flex items-center text-gray-400 focus-within:text-blue-400">
                    <Mail className="absolute w-5 h-5 ml-4 mt-2.5 " />
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border mt-3 border-gray-400 focus:border-blue-400 transition-all outline-none p-2"
                      type="email"
                      name=""
                      id=""
                      placeholder="Seu endereço de email"
                    />
                  </div>

                  <label htmlFor="" className="block">
                    Senha
                  </label>
                  <div className="relative flex items-center text-gray-400 focus-within:text-blue-400">
                    <LockKeyhole className="absolute w-5 h-5 ml-4 mt-2.5 " />
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border mt-3 border-gray-400 focus:border-blue-400 transition-all outline-none p-2"
                      type="password"
                      name=""
                      id=""
                      placeholder="Sua senha"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={!isLogin ? postUser : loginUser}
                    className="hover:opacity-85 mt-8 font-poppins font-medium text-white w-full shadow-blue-400 transition-all bg-blue-400 rounded-md p-2"
                  >
                    {isLogin && <p>Entrar </p>}
                    {!isLogin && <p> Criar conta </p>}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
