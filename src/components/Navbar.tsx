import logo from '../imgs/logo.png';

import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function Navbar() {
  return (
    <div className="sticky flex row justify-between items-center p-1 shadow-sm">
      <div>
        <Link to={'/'}>
          <img className="size-16 cursor-pointer" src={logo} alt="" />
        </Link>
      </div>
      <div className="flex row justify-center gap-8 ml-8">
        <button className="font-medium hover:text-blue-400">
          <Link to={'/posts'}> Postagens </Link>
        </button>
        <button className="font-medium hover:text-blue-400">
          <HashLink smooth to={'/#sobre'}>
            Sobre
          </HashLink>
        </button>
      </div>
      <div className="flex row gap-8">
        <button className="font-medium hover:text-blue-400">
          <Link to={'/login'}> Login </Link>
        </button>
        <button className="font-medium hover:text-blue-400">
          <Link to={'/login'}> Cadastre-se </Link>
        </button>
      </div>
    </div>
  );
}
