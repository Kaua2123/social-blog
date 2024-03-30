import { FileText, Text, X, Tags, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

import axios from '../services/axios';
import noImg from '../imgs/no-img.png';
import { useState } from 'react';

export type ModalUpdateProps = {
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  post_id: number;
};

export default function ModalUpdate({
  setIsUpdating,
  post_id,
}: ModalUpdateProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageURL, setImageURL] = useState('');

  const updatePost = async () => {
    await axios
      .put(`post/update/${post_id}`, { title, content, tags })
      .then((response) => {
        console.log(response);
        toast.success('Post atualizado.');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Erro ao atualizar o post.');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files;

    if (!image) return;

    const imgURL = URL.createObjectURL(image[0]);
    setImageURL(imgURL);

    const formData = new FormData();
    formData.append('image', image[0]);

    try {
      axios.post(`image/post/${post_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Imagem adicionada');
    } catch (error) {
      toast.error('Erro ao adicionar imagem');
    }
  };

  return (
    <>
      <div
        className="flex fixed items-center z-10 top-0 bottom-0 left-0 right-0
          bg-black transform bg-opacity-35 justify-center"
      >
        <div className="relative rounded-md w-full p-20 bg-white">
          <button
            onClick={() => setIsUpdating(false)}
            className="absolute top-0 right-0 m-4 hover:text-gray-500 transition-all"
          >
            <X />
          </button>
          <p className="font-poppins text-2xl">
            <b className="text-blue-400">Atualize</b> seu post
          </p>
          <div className="flex">
            <form action="" className="w-1/2">
              <>
                <label htmlFor="" className="block">
                  Título
                </label>
                <div className="relative flex items-center text-gray-400 focus-within:text-blue-400">
                  <FileText className="absolute w-5 h-5 ml-4 mt-2.5 pointer-events-none" />
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border border-gray-400 focus:border-blue-400 transition-all outline-none mt-3 p-2 "
                    type="text"
                    name=""
                    id=""
                    placeholder="Título do post"
                  />
                </div>
                <label htmlFor="" className="block">
                  Conteúdo
                </label>
                <div className="relative flex items-center text-gray-400 focus-within:text-blue-400">
                  <Text className="absolute w-5 h-5 ml-4 mt-2.5 pointer-events-none" />
                  <textarea
                    onChange={(e) => setContent(e.target.value)}
                    className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border border-gray-400 focus:border-blue-400 transition-all outline-none mt-3 p-2 "
                    name=""
                    id=""
                    placeholder="Conteúdo do post"
                  />
                </div>
              </>

              <label htmlFor="" className="block mt-2">
                Tags
              </label>
              <div className="relative flex items-center text-gray-400 focus-within:text-blue-400">
                <Tags className="absolute w-5 h-5 ml-4 mt-2.5 " />
                <input
                  onChange={(e) => setTags(e.target.value)}
                  className="pr-3 pl-12 rounded-md w-full placeholder-gray-500 text-black border mt-3 border-gray-400 focus:border-blue-400 transition-all outline-none p-2"
                  type="text"
                  name=""
                  id=""
                  placeholder="Tags do post"
                />
              </div>
              <button
                onClick={updatePost}
                type="submit"
                className="font-poppins hover:opacity-85 w-28 mt-8 font-medium text-white  transition-all bg-blue-400 rounded-md  p-2"
              >
                Atualizar
              </button>
            </form>

            <div className="w-1/2 flex flex-col gap-8 items-center justify-center">
              <div>
                <img
                  src={imageURL ? imageURL : noImg}
                  alt=""
                  className="w-80 rounded-xl"
                />
              </div>

              <div>
                <button className="font-poppins hover:opacity-85 w-56 h-10 font-medium text-white  transition-all bg-blue-400 rounded-md">
                  <label
                    htmlFor="image-input"
                    className="cursor-pointer flex flex-row items-center justify-center  gap-5 "
                  >
                    Adicionar imagem
                    <input
                      id="image-input"
                      type="file"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      className="hidden"
                    />
                    <Camera size={22} />
                  </label>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
