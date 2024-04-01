import {
  EllipsisVertical,
  Heart,
  MessageCircle,
  SendHorizonal,
  Trash,
  User,
} from 'lucide-react';
import { CommentsProtocol } from '../interfaces/comments-protocol';
import { formatDate } from '../utils/formatDate';
import axios from '../services/axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { tokenDecoder } from '../utils/tokenDecoder';
import { Spinner } from '@chakra-ui/spinner';
import { RiPencilFill } from 'react-icons/ri';

export type CommentsProps = {
  comments: CommentsProtocol[];
  post_id: number;
};

export default function Comments({ comments, post_id }: CommentsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDeleting, setIsLoadingDeleting] = useState(false);
  const [isLoadingUpdating, setIsLoadingUpdating] = useState(false);
  const [content, setContent] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeIndexUpdating, setActiveIndexUpdating] = useState<number | null>(
    null,
  );
  const token = localStorage.getItem('token');
  const user_id = tokenDecoder(token)?.id;

  const toggleEllipsis = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleInputUpdating = (index: number) => {
    setActiveIndexUpdating(activeIndexUpdating === index ? null : index);
  };

  const postComments = async () => {
    setIsLoading(true);
    axios.defaults.headers.Authorization = `Bearer ${token}`;

    if (!content || content.length === 0) {
      setIsLoading(false);
      return toast.error('Você não pode enviar um comentario vazio.');
    }

    await axios
      .post('comment/store', { content, user_id, post_id })
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        toast.success('Comentário enviado.');
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.error(error.response.data);
      });
  };

  const updateComment = async (id: number) => {
    setIsLoadingUpdating(false);
    axios.defaults.headers.Authorization = `Bearer ${token}`;

    if (!content || content.length === 0) {
      setIsLoadingUpdating(false);
      return toast.error('Você não pode enviar um comentario vazio.');
    }

    await axios
      .put(`comment/update/${id}`, { content, user_id, post_id })
      .then((response) => {
        console.log(response);
        setIsLoadingUpdating(false);
        setActiveIndexUpdating(null);
        toast.success('Comentário atualizado.');
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.error('Erro ao tentar atualizar comentário.');
      });
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

  return (
    <>
      <div className="m-28 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-blue-400 font-poppins">
          Comentários
        </h1>
        <div className="flex gap-8 items-center">
          <User size={60} />
          <input
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite algo..."
            className="rounded-md
            pl-10 p-2 w-10/12 outline-none
            flex items-center gap-20 border border-black"
          />
          <button
            onClick={postComments}
            className="flex items-center justify-center bg-blue-400 text-white p-3 rounded-full hover:opacity-85"
          >
            {isLoading ? (
              <Spinner boxSize="25px" color="white" />
            ) : (
              <SendHorizonal />
            )}
          </button>
        </div>
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

            <div className="flex flex-col justify-center gap-5">
              {activeIndexUpdating === index ? (
                <div className="flex gap-8 items-center">
                  <input
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Digite algo..."
                    className="rounded-md
                  pl-10 p-2 w-10/12 outline-none
                  flex items-center gap-20 border border-black"
                  />
                  <button
                    onClick={() => updateComment(comment.id)}
                    className="flex items-center justify-center bg-blue-400 text-white p-3 rounded-full hover:opacity-85"
                  >
                    {isLoadingUpdating ? (
                      <Spinner boxSize="25px" color="white" />
                    ) : (
                      <SendHorizonal />
                    )}
                  </button>
                </div>
              ) : (
                <div className="">{comment.content}</div>
              )}
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
                <button className=" font-poppins hover:opacity-65">
                  Responder
                </button>
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
