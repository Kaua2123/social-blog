import { X } from 'lucide-react';
import axios from '../services/axios';
import toast from 'react-hot-toast';

export type ModalDeleteProps = {
  isDeleting: boolean;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  post_id: number;
};

export default function ModalDelete({
  isDeleting,
  setIsDeleting,
  post_id,
}: ModalDeleteProps) {
  if (!isDeleting) return <></>;

  const deletePost = async () => {
    await axios
      .delete(`post/delete/${post_id}`)
      .then((response) => {
        console.log(response);
        toast.success('Post deletado.');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        className="flex fixed items-center z-10 top-0 bottom-0 left-0 right-0
          bg-black transform bg-opacity-35 justify-center"
      >
        <div className="relative rounded-md p-20 bg-white">
          <button
            onClick={() => setIsDeleting(false)}
            className="absolute top-0 right-0 m-4 hover:text-gray-500 transition-all"
          >
            <X />
          </button>
          <p className="font-poppins text-xl">
            Tem certeza de que quer <b className="text-red-400">excluir</b> esta
            postagem?
          </p>

          <div className="flex flex-row gap-8">
            <button
              type="submit"
              className="border border-gray-300 font-poppins hover:opacity-85 w-28 mt-8 font-medium transition-all rounded-md  p-2"
            >
              Não
            </button>
            <button
              onClick={deletePost}
              type="submit"
              className="font-poppins hover:opacity-85 w-28 mt-8 font-medium text-white  transition-all bg-red-400 rounded-md  p-2"
            >
              Sim
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
