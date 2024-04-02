import {
  EllipsisVertical,
  Heart,
  MessageCircle,
  Trash,
  User,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Spinner } from '@chakra-ui/spinner';
import { RiPencilFill } from 'react-icons/ri';

import PostComment from './post-comment';
import UpdateComment from './update-comment';
import axios from '../../services/axios';
import { formatDate } from '../../utils/formatDate';
import { CommentsProtocol } from '../../interfaces/comments-protocol';
import { tokenDecoder } from '../../utils/tokenDecoder';

export type CommentsProps = {
  comments: CommentsProtocol[];
  post_id: number;
};

export default function Comments({ comments, post_id }: CommentsProps) {
  const [isAnswering, setIsAnswering] = useState(false);
  const [isLoadingDeleting, setIsLoadingDeleting] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeIndexOfAnswer, setActiveIndexOfAnswer] = useState<number | null>(
    null,
  );
  const [activeIndexUpdating, setActiveIndexUpdating] = useState<number | null>(
    null,
  );

  const token = localStorage.getItem('token');
  const user_id = tokenDecoder(token)?.id;

  const toggleEllipsis = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleAnswer = (index: number) => {
    setActiveIndexOfAnswer(activeIndexOfAnswer === index ? null : index);
  };

  const toggleInputUpdating = (index: number) => {
    setActiveIndexUpdating(activeIndexUpdating === index ? null : index);
  };

  const deleteComment = async (id: number) => {
    setIsLoadingDeleting(true);
    axios.defaults.headers.Authorization = `Bearer ${token}`;

    await axios
      .delete(`comment/delete/${id}`)
      .then(() => {
        setIsLoadingDeleting(false);
        setActiveIndex(null);
        toast.success('Comentário excluído com sucesso');
      })
      .catch(() => {
        setIsLoadingDeleting(false);
        toast.error('Erro ao excluir comentário');
      });
  };

  console.log(comments);
  return (
    <>
      <div className="m-28 flex flex-col gap-12">
        <h1 className="text-3xl font-bold text-blue-400 font-poppins">
          Comentários
        </h1>
        <PostComment post_id={post_id} />
      </div>

      {comments &&
        comments.map((comment, index) => (
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
                  <p className="text-gray-500">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              </div>
              {comment.user_id === user_id && (
                <div className="flex flex-col items-center">
                  <button
                    className="hover:text-blue-400"
                    onClick={() => {
                      toggleEllipsis(index);
                    }}
                  >
                    <EllipsisVertical />
                  </button>

                  {activeIndex === index && (
                    <div className="z-10 mt-8 gap-2 items-center border rounded-lg p-2 justify-center flex flex-col absolute">
                      <button
                        type="submit"
                        onClick={() => toggleInputUpdating(index)}
                        className="hover:text-blue-400 flex items-center gap-3 font-poppins hover:opacity-85 mt-4 w-24 font-medium rounded-md  p-2"
                      >
                        <RiPencilFill />
                        Editar
                      </button>
                      <button
                        onClick={() => deleteComment(comment.id)}
                        className="hover:text-blue-400 flex justify-center items-center gap-3 font-poppins hover:opacity-85 w-24 font-medium rounded-md  p-2"
                      >
                        {isLoadingDeleting ? (
                          <Spinner boxSize="14px" color="black" />
                        ) : (
                          <>
                            <Trash />
                            <p>Excluir</p>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <UpdateComment
              comment={comment}
              index={index}
              post_id={post_id}
              activeIndexUpdating={activeIndexUpdating}
              setActiveIndexUpdating={setActiveIndexUpdating}
            />

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
              <button
                onClick={() => {
                  toggleAnswer(index);
                  setIsAnswering(!isAnswering);
                }}
                className={
                  isAnswering && activeIndexOfAnswer === index
                    ? 'font-poppins hover:opacity-65 text-blue-400'
                    : 'font-poppins hover:opacity-65'
                }
              >
                Responder
              </button>
            </div>
            {isAnswering && activeIndexOfAnswer === index && (
              <h1>
                <PostComment post_id={post_id} />
              </h1>
            )}
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
