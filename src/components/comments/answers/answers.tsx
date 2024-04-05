import { EllipsisVertical, Heart, Trash, User } from 'lucide-react';
import { AnswersProtocol } from '../../../interfaces/answers-protocol';
import { formatDate } from '../../../utils/formatDate';
import { useState } from 'react';
import axios from '../../../services/axios';
import toast from 'react-hot-toast';
import { RiPencilFill } from 'react-icons/ri';
import { Spinner } from '@chakra-ui/spinner';
import UpdateAnswer from './update-answer';
import { toggleEllipsis } from '../../../utils/toggleEllipsis';
import { toggleInputUpdating } from '../../../utils/toggleUpdating';
import { toggleAnswer } from '../../../utils/toggleAnswer';
import AnswerComment from './answer-comment';

export type AnswersProps = {
  answer: AnswersProtocol;
  index: number;
  user_id: number | undefined;
  comment_id: number;
};

export default function Answers({
  answer,
  index,
  user_id,
  comment_id,
}: AnswersProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeIndexOfAnswer, setActiveIndexOfAnswer] = useState<number | null>(
    null,
  );

  const [activeIndexUpdating, setActiveIndexUpdating] = useState<number | null>(
    null,
  );

  const deleteAnswer = async (id: number) => {
    setIsLoading(true);

    await axios
      .delete(`answer/delete/${id}`)
      .then(() => {
        setIsLoading(false);
        setActiveIndex(null);
        toast.success('Comentário excluído com sucesso');
      })
      .catch(() => {
        setIsLoading(false);
        toast.error('Erro ao excluir comentário');
      });
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="items-center flex gap-8 ">
          <div>
            {answer.User.image ? (
              <img
                src={answer.User.image_url}
                className="w-16 h-16 rounded-full"
                alt=""
              />
            ) : (
              <User size={50} />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-blue-400 font-poppins">
              {answer.User.username ? answer.User.username : 'Sem nome'}
            </p>
            <p className="text-gray-500">{formatDate(answer.createdAt)}</p>
          </div>
        </div>
        {answer.user_id === user_id && (
          <div className="flex flex-col items-center">
            <button
              className="hover:text-blue-400"
              onClick={() => {
                toggleEllipsis(index, activeIndex, setActiveIndex);
              }}
            >
              <EllipsisVertical />
            </button>

            {activeIndex === index && (
              <div className="z-10 mt-8 gap-2 items-center border rounded-lg p-2 justify-center flex flex-col absolute">
                <button
                  type="submit"
                  onClick={() =>
                    toggleInputUpdating(
                      index,
                      activeIndexUpdating,
                      setActiveIndexUpdating,
                    )
                  }
                  className="hover:text-blue-400 flex items-center gap-3 font-poppins hover:opacity-85 mt-4 w-24 font-medium rounded-md  p-2"
                >
                  <RiPencilFill />
                  Editar
                </button>
                <button
                  onClick={() => deleteAnswer(answer.id)}
                  className="hover:text-blue-400 flex justify-center items-center gap-3 font-poppins hover:opacity-85 w-24 font-medium rounded-md  p-2"
                >
                  {isLoading ? (
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

      <UpdateAnswer
        answer={answer}
        index={index}
        comment_id={comment_id}
        activeIndexUpdating={activeIndexUpdating}
        setActiveIndexUpdating={setActiveIndexUpdating}
      />

      <div className="flex flex-row gap-5 mb-12">
        <Heart
          cursor="pointer"
          className="hover:text-red-400 visited:text-red-400"
        />
        <p>0</p>

        <button
          onClick={() => {
            toggleAnswer(index, activeIndexOfAnswer, setActiveIndexOfAnswer);
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
        <div className="ml-6 mt-4">
          <AnswerComment comment_id={comment_id} />
        </div>
      )}
    </div>
  );
}
