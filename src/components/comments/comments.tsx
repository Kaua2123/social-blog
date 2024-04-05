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
import AnswerComment from './answers/answer-comment';
import UpdateAnswer from './answers/update-answer';

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
  const [activeIndexOfAnswering, setActiveIndexOfAnswering] = useState<
    number | null
  >(null);
  const [activeIndexUpdating, setActiveIndexUpdating] = useState<number | null>(
    null,
  );
  const [activeIndexUpdatingAnswering, setActiveIndexUpdatingAnswering] =
    useState<number | null>(null);

  const token = localStorage.getItem('token');
  const user_id = tokenDecoder(token)?.id;

  const toggleEllipsis = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleEllipsisAnswering = (index: number) => {
    setActiveIndexOfAnswering(activeIndexOfAnswering === index ? null : index);
  };

  const toggleAnswer = (index: number) => {
    setActiveIndexOfAnswer(activeIndexOfAnswer === index ? null : index);
  };

  const toggleInputUpdating = (index: number) => {
    setActiveIndexUpdating(activeIndexUpdating === index ? null : index);
  };

  const deleteComment = async (id: number) => {
    setIsLoadingDeleting(true);

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

  const deleteAnswer = async (id: number) => {
    setIsLoadingDeleting(true);

    await axios
      .delete(`answer/delete/${id}`)
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
              <div className="items-center flex gap-8 ">
                <div>
                  {comment.User.image ? (
                    <img
                      src={comment.User.image_url}
                      className="w-16 h-16 rounded-full"
                      alt=""
                    />
                  ) : (
                    <User size={50} />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-blue-400 font-poppins">
                    {comment.User.username ? comment.User.username : 'Sem nome'}
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
            <div className="ml-6 mt-4">
              {comment.Answers.map &&
                comment.Answers.map((answer, answerIndex) => (
                  <>
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
                            {answer.User.username
                              ? answer.User.username
                              : 'Sem nome'}
                          </p>
                          <p className="text-gray-500">
                            {formatDate(answer.createdAt)}
                          </p>
                        </div>
                      </div>
                      {answer.user_id === user_id && (
                        <div className="flex flex-col items-center">
                          <button
                            className="hover:text-blue-400"
                            onClick={() => {
                              toggleEllipsisAnswering(answerIndex);
                            }}
                          >
                            <EllipsisVertical />
                          </button>

                          {activeIndexOfAnswering === answerIndex && (
                            <div className="z-10 mt-8 gap-2 items-center border rounded-lg p-2 justify-center flex flex-col absolute">
                              <button
                                type="submit"
                                onClick={() => toggleInputUpdating(answerIndex)}
                                className="hover:text-blue-400 flex items-center gap-3 font-poppins hover:opacity-85 mt-4 w-24 font-medium rounded-md  p-2"
                              >
                                <RiPencilFill />
                                Editar
                              </button>
                              <button
                                onClick={() => deleteAnswer(answer.id)}
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

                    <UpdateAnswer
                      answer={answer}
                      index={answerIndex}
                      comment_id={comment.id}
                      activeIndexUpdatingAnswering={
                        activeIndexUpdatingAnswering
                      }
                      setActiveIndexUpdatingAnswering={
                        setActiveIndexUpdatingAnswering
                      }
                    />

                    <div className="flex flex-row gap-5 mb-12">
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
                  </>
                ))}
            </div>
            {isAnswering && activeIndexOfAnswer === index && (
              <div className="ml-6 mt-4">
                <AnswerComment comment_id={comment.id} />
              </div>
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
