import { Spinner } from '@chakra-ui/spinner';
import { SendHorizonal } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';

import { CommentsProtocol } from '../../interfaces/comments-protocol';
import { tokenDecoder } from '../../utils/tokenDecoder';
import axios from '../../services/axios';

export type UpdateCommentProps = {
  comment: CommentsProtocol;
  index: number;
  post_id: number;
  activeIndexUpdating: number | null;
  setActiveIndexUpdating: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function UpdateComment({
  comment,
  index,
  post_id,
  activeIndexUpdating,
  setActiveIndexUpdating,
}: UpdateCommentProps) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem('token');
  const user_id = tokenDecoder(token)?.id;

  const updateComment = async (id: number) => {
    setIsLoading(true);

    if (!content || content.length === 0) {
      setIsLoading(false);
      return toast.error('Você não pode enviar um comentario vazio.');
    }

    await axios
      .put(`comment/update/${id}`, { content, user_id, post_id })
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        setActiveIndexUpdating(null);
        toast.success('Comentário atualizado.');
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.error('Erro ao tentar atualizar comentário.');
      });
  };

  return (
    <>
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
              {isLoading ? (
                <Spinner boxSize="25px" color="white" />
              ) : (
                <SendHorizonal />
              )}
            </button>
          </div>
        ) : (
          <div className="">{comment.content}</div>
        )}
      </div>
    </>
  );
}
