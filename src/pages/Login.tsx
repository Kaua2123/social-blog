import { Mail, User, LockKeyhole } from 'lucide-react';
import login from '../imgs/svg/blog-post-logincadastro.svg';
import { useState } from 'react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <section className="min-h-full w-full">
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
                  className="font-medium text-blue-400 hover:opacity-85"
                >
                  {!isLogin && <p>Entre agora</p>}
                  {isLogin && <p>Criar conta</p>}
                </button>
              </div>
            </div>

            <form action="">
              <label htmlFor="" className="block">
                Apelido
              </label>
              <div className="relative flex items-center text-gray-400 focus-within:text-blue-400">
                <User className="absolute w-5 h-5 ml-4 mt-2.5 pointer-events-none" />
                <input
                  className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border border-gray-400 focus:border-blue-400 transition-all outline-none mt-3 p-2 "
                  type="text"
                  name=""
                  id=""
                  //   placeholder="seuemail@gmail.com"
                />
              </div>

              <label htmlFor="" className="block">
                Endereço de Email
              </label>
              <div className="relative flex items-center text-gray-400 focus-within:text-blue-400">
                <Mail className="absolute w-5 h-5 ml-4 mt-2.5 " />
                <input
                  className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border mt-3 border-gray-400 focus:border-blue-400 transition-all outline-none p-2"
                  type="text"
                  name=""
                  id=""
                  //   placeholder="seuemail@gmail.com"
                />
              </div>

              <label htmlFor="" className="block">
                Senha
              </label>
              <div className="relative flex items-center text-gray-400 focus-within:text-blue-400">
                <LockKeyhole className="absolute w-5 h-5 ml-4 mt-2.5 " />
                <input
                  className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border mt-3 border-gray-400 focus:border-blue-400 transition-all outline-none p-2"
                  type="text"
                  name=""
                  id=""
                  //   placeholder="seuemail@gmail.com"
                />
              </div>

              <button
                type="submit"
                className="hover:opacity-85 mt-8 font-medium text-white shadow-md w-full shadow-blue-400 transition-all bg-blue-400 rounded-md p-2"
              >
                {isLogin && <p>Entrar </p>}
                {!isLogin && <p> Criar conta </p>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
