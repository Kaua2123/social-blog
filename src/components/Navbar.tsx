import { User } from 'lucide-react';
import logo from '../imgs/logo.png';

import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import axios from '../services/axios';
import { useEffect, useState } from 'react';
import { tokenDecoder } from '../utils/tokenDecoder';

export default function Navbar() {
  const token = localStorage.getItem('token');
  const decodedToken = tokenDecoder(token);
  const [userPhoto, setUserPhoto] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const getUsersPhoto = async () => {
      await axios
        .get(`/user/${decodedToken?.id}`)
        .then((response) => {
          setImage(response.data.image);
          setUserPhoto(response.data.image_url);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getUsersPhoto();
  }, [decodedToken?.id]);

  return (
    <div className="sticky flex row justify-between items-center  p-1 shadow-sm">
      <div>
        <Link to={'/'}>
          <img className="size-16 cursor-pointer" src={logo} alt="" />
        </Link>
      </div>
      <div className="flex row justify-center gap-8">
        <button className="font-medium hover:text-blue-400">
          <Link to={'/posts'}> Postagens </Link>
        </button>
        {token && (
          <button className="font-medium hover:text-blue-400">
            <Link to={'/myPosts'}> Meus posts </Link>
          </button>
        )}
        {!token && (
          <button className="font-medium hover:text-blue-400">
            <HashLink smooth to={'/#sobre'}>
              Sobre
            </HashLink>
          </button>
        )}
      </div>
      {token ? (
        <div className=" flex items-center gap-5">
          <Link to={'/profile'} className="border-black border rounded-full">
            {image ? (
              <img src={userPhoto} alt="" className="w-12 h-12 rounded-full" />
            ) : (
              <User size={40} />
            )}
          </Link>
        </div>
      ) : (
        <div className="">
          <button className="font-medium hover:text-blue-400 mr-8">
            <Link to={'/login'}> Entrar </Link>
          </button>
        </div>
      )}
    </div>
  );
}
