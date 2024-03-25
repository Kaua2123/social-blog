import { ArrowRight } from 'lucide-react';

import noImg from '../imgs/no-img.png';
import { Link } from 'react-router-dom';
import { PostProtocol } from '../interfaces/post-protocol';
import { addDotsOnLongContent } from '../utils/addDotsOnLongContent';

export type PostCardProps = {
  post: PostProtocol;
};

export default function PostCard({ post }: PostCardProps) {
  const content = addDotsOnLongContent(post);

  return (
    <>
      <div
        style={{ height: '440px', width: '350px', minWidth: '350px' }}
        className="flex flex-col shadow-lg rounded-2xl"
      >
        <div className="h-1/2">
          <img
            src={post.image ? post.image_url : noImg}
            className="w-full h-full rounded-t-2xl"
            alt=""
          />
        </div>

        <div className="p-8 h-1/2">
          <h1 className="font-poppins text-blue-400 font-medium text-xl mb-3">
            {post.title}
          </h1>

          <h3 className="font-poppins">{content}</h3>

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
