import { Spinner } from '@chakra-ui/spinner';
import { SendHorizonal } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';

import { tokenDecoder } from '../../../utils/tokenDecoder';
import axios from '../../../services/axios';
import { AnswersProtocol } from '../../../interfaces/answers-protocol';

export type UpdateAnswerProps = {
  answer: AnswersProtocol;
  index: number;
  comment_id: number;
  activeIndexUpdating: number | null;
  setActiveIndexUpdating: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function UpdateAnswer({
  answer,
  index,
  comment_id,
  activeIndexUpdating,
  setActiveIndexUpdating,
}: UpdateAnswerProps) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem('token');
  const user_id = tokenDecoder(token)?.id;

  const updateAnswer = async (id: number) => {
    setIsLoading(true);

    if (!content || content.length === 0) {
      setIsLoading(false);
      return toast.error('Você não pode enviar um comentario vazio.');
    }

    await axios
      .put(`answer/update/${id}`, { content, user_id, comment_id })
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
          <div className="flex gap-8 mt-8 mb-8 items-center">
            <input
              onChange={(e) => setContent(e.target.value)}
              placeholder="Digite algo..."
              className="rounded-md
                        pl-10 p-2 w-10/12 outline-none
                        flex items-center gap-20 border border-black"
            />
            <button
              onClick={() => updateAnswer(answer.id)}
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
          <div className="mt-6 mb-6">{answer.content}</div>
        )}
      </div>
    </>
  );
}
