import { User, Camera, Mail, LockKeyhole, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { tokenDecoder } from '../utils/tokenDecoder';
import Navbar from '../components/navbar';
import toast from 'react-hot-toast';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/loader';
import { UserProtocol } from '../interfaces/user-protocol';

export default function Profile() {
  const [user, setUser] = useState<UserProtocol>();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');
  const decodedToken = tokenDecoder(token);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(`user/${decodedToken?.id}`)
        .then((response) => {
          setUser(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    };

    getUser();
  });

  const updateUser = async () => {
    console.log(email, password);
    if (!email || !password)
      return toast.error(
        'Você deve pelo menos confirmar o email e a senha, digitando os mesmos novamente.',
      );

    await axios
      .put(`/user/update/${decodedToken?.id}`, {
        name,
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        toast.success('Dados atualizados com sucesso.');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Ocorreu um erro');
      });
  };

  return (
    <>
      {!isLoading ? (
        <>
          <Navbar />
          <div>
            <div className="w-full h-full flex flex-wrap items-center justify-center ">
              <div className="p-3 flex flex-col items-center gap-8">
                <h1 className="text-blue-400 font-poppins font-medium text-5xl">
                  Meu Perfil
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
                        onChange={(e) => setName(e.target.value)}
                        className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border border-gray-400 focus:border-blue-400 transition-all outline-none mt-3 p-2 "
                        type="text"
                        name=""
                        id=""
                        defaultValue={user ? user.name : ''}
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
                        defaultValue={user ? user.username : ''}
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
                        onChange={(e) => setEmail(e.target.value)}
                        className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border mt-3 border-gray-400 focus:border-blue-400 transition-all outline-none p-2"
                        type="email"
                        name=""
                        id=""
                        defaultValue={user ? user.email : ''}
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
                        defaultValue={user ? user.password : ''}
                        placeholder="Sua senha"
                      />
                    </div>
                  </div>
                </div>
              </form>
              <button
                type="button"
                onClick={updateUser}
                className="hover:opacity-85 mt-8 font-poppins font-medium text-white w-full shadow-blue-400 transition-all bg-blue-400 rounded-md p-2"
              >
                Atualizar
              </button>
            </div>
          </div>
          <div className="absolute flex gap-2 rounded-lg bg-blue-400 right-10">
            <button
              onClick={() => {
                localStorage.removeItem('token');
                toast.success('Você saiu da conta.');
                navigate('/');
              }}
              className="hover:opacity-85  flex gap-4 font-poppins font-medium text-white w-full shadow-blue-400 transition-all bg-blue-400 rounded-md p-3"
            >
              <p className="text-white">Sair</p>
              <LogOut className="text-white" />
            </button>
          </div>
        </>
      ) : (
        <Loader isLoading={isLoading} />
      )}
    </>
  );
}
