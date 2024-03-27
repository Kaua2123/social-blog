import { Heart, MessageCircle, User } from 'lucide-react';
import { CommentsProtocol } from '../interfaces/comments-protocol';
import { formatDate } from '../utils/formatDate';

export type CommentsProps = {
  comments: CommentsProtocol[];
};

export default function Comments({ comments }: CommentsProps) {
  const commentDate = comments.map((comment) => formatDate(comment.createdAt));

  return (
    <>
      <div className="m-28 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-blue-400 font-poppins">
          Comentários
        </h1>
        <div className="flex gap-8 items-center">
          <User size={60} />
          <input
            placeholder="Digite algo..."
            className="rounded-md
            pl-10 p-2 w-full outline-none
            flex items-center gap-20 border border-black"
          />
        </div>
      </div>

      {comments &&
        comments.map((comment) => (
          <div
            key={comment.id}
            className="m-28 rounded-md p-6 flex flex-col flex-wrap gap-8"
          >
            <div className="flex justify-between">
              <div className="items-center flex  gap-8 ">
                <div>
                  <User size={50} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-blue-400 font-poppins">
                    {comment.User.username}
                  </p>
                  <p className="text-gray-500">{commentDate}</p>
                </div>
              </div>
              <div>
                <button className=" font-poppins hover:opacity-85 w-32 h-10 font-medium text-white  transition-all bg-blue-400 rounded-md">
                  Responder
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="">{comment.content}</div>
              <div className="flex flex-row gap-5">
                <Heart
                  cursor="pointer"
                  className="hover:text-red-400 visited:text-red-400"
                />
                <p>0</p>
                <MessageCircle
                  cursor="pointer"
                  className="hover:text-gray-400 visited:text-gray-400"
                />
                <p>0</p>
              </div>
            </div>
          </div>
        ))}
      {comments.length == 0 && (
        <h1 className="text-blue-400 font-poppins text-3xl mb-20 flex items-center justify-center">
          Parece que não há comentários neste post.
        </h1>
      )}
    </>
  );
}
