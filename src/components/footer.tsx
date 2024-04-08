export default function Footer() {
  return (
    <div className="flex lg:flex-row lg:items-start flex-col items-center  bg-slate-100">
      <div className="lg:p-20 p-10 flex flex-col gap-2">
        <p className="text-blue-400 font-poppins">INFORMAÇÃO</p>
        <a href="#" className="text-gray-500">
          Sobre
        </a>
        <a href="#" className="text-gray-500">
          Saiba mais
        </a>
        <a href="#" className="text-gray-500">
          Contate-nos
        </a>
      </div>

      <div className="lg:p-20 p-10  lg:ml-0 ml-8 flex flex-col gap-2">
        <p className="text-blue-400 font-poppins">RECURSOS</p>
        <a href="#" className="text-gray-500">
          Criar um Post
        </a>
        <a href="#" className="text-gray-500">
          Visualizar Postagens
        </a>
      </div>

      <div className="lg:p-20 p-10 lg:ml-0 ml-4 flex flex-col gap-2">
        <p className="text-blue-400 font-poppins">ACESSO RÁPIDO</p>
        <a href="#" className="text-gray-500">
          Home
        </a>
        <a href="#" className="text-gray-500">
          Postagens
        </a>
        <a href="#" className="text-gray-500">
          Sobre
        </a>
      </div>

      <div className="lg:p-20 p-10 lg:items-start items-center flex flex-col gap-8">
        <p className="text-blue-400 font-poppins">Contate-nos</p>
        <div className="flex flex-col lg:flex-row gap-4 shadow-sm items-center">
          <input
            type="text"
            className="pl-4 p-2 w-56 shadow-sm"
            placeholder="Seu email"
          />
          <button
            type="submit"
            className=" font-poppins hover:opacity-85 lg:w-32 w-56 h-10 font-medium text-white  transition-all bg-blue-400 rounded-md"
          >
            ENVIAR
          </button>
        </div>
      </div>
    </div>
  );
}
