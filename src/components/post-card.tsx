import { ArrowRight } from 'lucide-react';

import xd from '../imgs/xd.jpg';
import { Link } from 'react-router-dom';
import { PostProtocol } from '../interfaces/post-protocol';

export type PostCardProps = {
  post: PostProtocol;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <>
      <div
        style={{ height: '440px', width: '350px', minWidth: '350px' }}
        className="flex flex-col shadow-lg rounded-2xl"
      >
        <div className="h-1/2">
          <img src={xd} className="w-full h-full rounded-t-2xl" alt="" />{' '}
          {/* imagem qualquer */}
        </div>
        <div className="p-8 h-1/2">
          <h1 className="font-poppins text-blue-400 font-medium text-xl mb-3">
            {post.title}
          </h1>
          <h3 className="font-poppins">Conteúdo do card aqui manow</h3>{' '}
          {/* 26 caracteres */}
          <Link to={`/${post.id}`}>
            <button
              type="submit"
              className=" font-poppins flex justify-between items-center hover:opacity-85 w-48 mt-8 font-medium text-white  transition-all bg-blue-400 rounded-md  p-2"
            >
              Ver post
              <ArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
