import { User, Camera, Mail, LockKeyhole } from 'lucide-react';
import { tokenDecoder } from '../utils/tokenDecoder';
import Navbar from '../components/navbar';

export default function Profile() {
  const token = localStorage.getItem('token');

  const decodedToken = tokenDecoder(token);

  return (
    <>
      <Navbar />
      <div>
        <div className="w-full h-full flex flex-wrap items-center justify-center ">
          <div className="p-3 flex flex-col items-center gap-8">
            <h1 className="text-blue-400 font-poppins font-medium text-5xl">
              Olá, {decodedToken?.name}
            </h1>
            <div className="rounded-full p-8 border border-black">
              <User className="" size={100} />
            </div>
            <button className="font-poppins hover:opacity-85 w-56 h-10 font-medium text-white  transition-all bg-blue-400 rounded-md">
              <label
                htmlFor="image-input"
                className="cursor-pointer flex flex-row items-center justify-center  gap-5 "
              >
                Alterar foto de perfil
                <input id="image-input" type="file" className="hidden" />
                <Camera size={22} />
              </label>
            </button>
          </div>
        </div>
      </div>

      <div className=" max-w-7xl mx-auto mt-10 flex items-center gap-40">
        <div className="flex flex-col">
          <h1 className="text-blue-400  text-2xl mb-3 font-poppins text-medium">
            Dados pessoais
          </h1>
          <h1 className="text-gray-700">Altere seus dados aqui</h1>
        </div>

        <div>
          <form action="">
            <div className="flex flex-row items-center gap-10 ">
              <div>
                <label htmlFor="" className="block">
                  Nome Completo
                </label>
                <div className="relative flex items-center mb-2 text-gray-400 focus-within:text-blue-400">
                  <User className="absolute w-5 h-5 ml-4 mt-2.5 pointer-events-none" />
                  <input
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
                    className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border border-gray-400 focus:border-blue-400 transition-all outline-none mt-3 p-2 "
                    type="text"
                    name=""
                    id=""
                    placeholder="Como quer ser chamado"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="" className="block">
                  Endereço de Email
                </label>
                <div className="relative flex items-center mb-2 text-gray-400 focus-within:text-blue-400">
                  <Mail className="absolute w-5 h-5 ml-4 mt-2.5 " />
                  <input
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
                    className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border mt-3 border-gray-400 focus:border-blue-400 transition-all outline-none p-2"
                    type="password"
                    name=""
                    id=""
                    placeholder="Sua senha"
                  />
                </div>
              </div>
            </div>
          </form>
          <button
            type="button"
            className="hover:opacity-85 mt-8 font-poppins font-medium text-white w-full shadow-blue-400 transition-all bg-blue-400 rounded-md p-2"
          >
            Atualizar
          </button>
        </div>
      </div>
    </>
  );
}
