import logo from '../imgs/logo.png';

import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="sticky flex row justify-between items-center p-1 shadow-sm">
      <div>
        <img className="size-16 cursor-pointer" src={logo} alt="" />
      </div>
      <div className="flex row justify-center gap-8 ml-8">
        <button className="font-medium hover:text-blue-400">Postagens</button>
        <button className="font-medium hover:text-blue-400">Sobre</button>
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
