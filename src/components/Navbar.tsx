import { User } from 'lucide-react';
import { Bell } from 'lucide-react';
import logo from '../imgs/logo.png';

import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function Navbar() {
  const token = localStorage.getItem('token');

  return (
    <div className="sticky flex row justify-between items-center  p-1 shadow-sm">
      <div>
        <Link to={'/'}>
          <img className="size-16 cursor-pointer" src={logo} alt="" />
        </Link>
      </div>
      <div className="flex row justify-center gap-8 ml-8">
        <button className="font-medium hover:text-blue-400">
          <Link to={'/posts'}> Postagens </Link>
        </button>
        {token && (
          <button className="font-medium hover:text-blue-400">
            <Link to={'/myPosts'}> Meus posts </Link>
          </button>
        )}
        <button className="font-medium hover:text-blue-400">
          <HashLink smooth to={'/#sobre'}>
            Sobre
          </HashLink>
        </button>
      </div>
      {token ? (
        <div className="mr-10 flex items-center gap-5">
          <Bell size={22} cursor={'pointer'} />

          <Link to={'/profile'} className="border-black border rounded-full">
            <User size={40} />
          </Link>
        </div>
      ) : (
        <div className="flex row gap-8 mr-4">
          <button className="font-medium hover:text-blue-400 mr-8">
            <Link to={'/login'}> Entrar </Link>
          </button>
        </div>
      )}
    </div>
  );
}
