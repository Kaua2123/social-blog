import { ArrowRight, Trash } from 'lucide-react';
import { RiPencilFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import noImg from '../imgs/no-img.png';
import { PostProtocol } from '../interfaces/post-protocol';
import { addDotsOnLongContent } from '../utils/addDotsOnLongContent';
import { addDotsOnLongTitle } from '../utils/addDotsOnLongTitle';
import { scrollToTop } from '../utils/scrollToTop';
import { useEffect, useState } from 'react';
import { tokenDecoder } from '../utils/tokenDecoder';

export type PostCardProps = {
  post: PostProtocol;
};

export default function PostCard({ post }: PostCardProps) {
  const content = addDotsOnLongContent(post);
  const title = addDotsOnLongTitle(post);
  const [isMyPost, setIsMyPost] = useState(false);

  const token = localStorage.getItem('token');
  const decodedToken = tokenDecoder(token);

  useEffect(() => {
    if (post.user_id === decodedToken?.id) setIsMyPost(true);
  }, [post.user_id, decodedToken?.id]);

  return (
    <>
      <div
        style={{ height: '440px', width: '350px', minWidth: '350px' }}
        className="relative flex flex-col shadow-lg rounded-2xl"
      >
        {isMyPost && (
          <>
            <button className="absolute p-2 m-2 transition-all hover:opacity-85 right-0 flex items-center justify-center bg-blue-400 rounded-full">
              <RiPencilFill color="white" />
            </button>
            <button className="absolute p-2 m-2 transition-all hover:opacity-85 bottom-0 right-0  flex items-center justify-center bg-blue-400 rounded-full">
              <Trash color="white" size={17} />
            </button>
          </>
        )}

        <div className="h-1/2">
          <img
            src={post.image ? post.image_url : noImg}
            className="w-full h-full rounded-t-2xl"
            alt=""
          />
        </div>

        <div className="p-8 h-1/2">
          <h1 className="font-poppins text-blue-400 font-medium text-xl mb-3">
            {title}
          </h1>

          <h3 className="font-poppins">{content}</h3>

          <button
            type="submit"
            className=" font-poppins hover:opacity-85 w-48 mt-8 font-medium text-white  transition-all bg-blue-400 rounded-md  p-2"
          >
            <Link
              to={`/${post.id}`}
              className=" flex justify-between items-center"
              onClick={scrollToTop}
            >
              Ver post
              <ArrowRight />
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
