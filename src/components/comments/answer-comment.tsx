import { useState } from 'react';
import { SendHorizonal, User } from 'lucide-react';
import { Spinner } from '@chakra-ui/spinner';
import toast from 'react-hot-toast';

import { tokenDecoder } from '../../utils/tokenDecoder';
import axios from '../../services/axios';

export type AnswerProps = {
  comment_id: number;
};

export default function AnswerComment({ comment_id }: AnswerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const token = localStorage.getItem('token');
  const user_id = tokenDecoder(token)?.id;

  const answerComment = async () => {
    setIsLoading(true);

    if (!content || content.length === 0) {
      setIsLoading(false);
      return toast.error('Você não pode enviar um comentario vazio.');
    }

    await axios
      .post('answer/store', { content, user_id, comment_id })
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

  return (
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
        onClick={answerComment}
        className="flex items-center justify-center bg-blue-400 text-white p-3 rounded-full hover:opacity-85"
      >
        {isLoading ? (
          <Spinner boxSize="25px" color="white" />
        ) : (
          <SendHorizonal />
        )}
      </button>
    </div>
  );
}
