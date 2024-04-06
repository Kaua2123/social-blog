import { useEffect, useState } from 'react';
import { SendHorizonal, User } from 'lucide-react';
import { Spinner } from '@chakra-ui/spinner';
import toast from 'react-hot-toast';

import { tokenDecoder } from '../../utils/tokenDecoder';
import axios from '../../services/axios';

export type PostCommentProps = {
  post_id: number;
};

export default function PostComment({ post_id }: PostCommentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [image, setImage] = useState('');
  const token = localStorage.getItem('token');
  const user_id = tokenDecoder(token)?.id;

  useEffect(() => {
    const getUsersPhoto = async () => {
      await axios
        .get(`/user/${user_id}`)
        .then((response) => {
          setImage(response.data.image);
          setUserPhoto(response.data.image_url);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getUsersPhoto();
  });

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

  return (
    <div className="flex gap-8 items-center">
      {image ? (
        <img src={userPhoto} alt="" className="w-12 h-12 rounded-full" />
      ) : (
        <User size={60} />
      )}
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
  );
}
