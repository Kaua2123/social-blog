import { Heart, MessageCircle, User } from 'lucide-react';

export default function Comments() {
  return (
    <>
      <div className="m-28 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-blue-400 font-poppins">
          Comentários
        </h1>
        <div className="flex gap-8 items-center">
          <User size={60} />
          <input
            placeholder="Digite algo..."
            className="rounded-md
            pl-10 p-2 w-full outline-none
            flex items-center gap-20 border border-black"
          />
        </div>
      </div>

      <div className="m-28 rounded-md p-6 flex flex-col flex-wrap gap-8">
        <div className="flex justify-between">
          <div className="items-center flex  gap-8 ">
            <div>
              <User size={50} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-blue-400 font-poppins">Nome do autor</p>
              <p>Data do comentario</p>
            </div>
          </div>
          <div>
            <button className=" font-poppins hover:opacity-85 w-32 h-10 font-medium text-white  transition-all bg-blue-400 rounded-md">
              Responder
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="">Conteúdo do comentário</div>
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
          </div>
        </div>
      </div>
    </>
  );
}
