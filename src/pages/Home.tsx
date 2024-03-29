import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';

import social from '../imgs/svg/img-social-home-blue.svg';

import { Forward, MessageCircle, Pencil } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import Footer from '../components/footer';

function Home() {
  return (
    <>
      <Navbar />

      <div className="shadow-sm bg-gradient-to-br from-white via-white to-blue-100">
        <section className="h-screen max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 justify-center items-center h-screen">
            <div className="mb-28">
              <div className="flex flex-col justify-center">
                <h1 className="font-poppins font-normal text-6xl pb-8">
                  <b className="text-blue-400">Compartilhe</b> aqui
                  <br /> o que pensa
                </h1>
                <p className="font-poppins font-normal text-lg pb-8">
                  Compartilhe suas ideias, opiniões e experiências com a <br />{' '}
                  nossa comunidade. Sua voz é importante para nós
                </p>
              </div>

              <div className="flex flex-row gap-8  w-full">
                <Link to={'/login'} className="font-poppins">
                  <button
                    className="shadow-lg shadow-blue-400 bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400
              transition-all rounded-md w-32 p-2"
                  >
                    Começar
                  </button>
                </Link>
                <HashLink smooth to={'/#sobre'} className="font-poppins">
                  <button
                    className="shadow-lg shadow-blue-400 bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400
                transition-all rounded-md w-32 p-2"
                  >
                    Saiba mais
                  </button>
                </HashLink>
              </div>
            </div>
            <div className="mb-28">
              <img className="" src={social} alt="" />
            </div>
          </div>
        </section>
      </div>

      <div>
        <section className="h-screen max-w-screen-xl mx-auto">
          <div
            id="sobre"
            className="flex flex-col text-center justify-center items-center"
          >
            <div className="w-1/2">
              <h2 className="font-poppins text-5xl mt-16 mb-8">
                Seja bem-vindo ao nosso{' '}
                <b className="text-blue-400">blog social</b>, onde cada voz é
                única e importante.
              </h2>
              <p className="text-lg">
                Descubra um espaço para compartilhar suas ideias, aprender com
                os outros e fazer parte de uma comunidade que valoriza a
                diversidade de pensamentos
              </p>
            </div>
          </div>

          <div className=" grid grid-cols-3 m-10">
            <div className="border shadow-lg  w-80 rounded-lg min-h-96 p-10">
              <div className="flex flex-col">
                <div>
                  <Forward size={70} className="mb-10" />
                </div>
                <div>
                  <h3 className="font-poppins mb-3 text-xl">
                    <b className="text-blue-400">Compartilhe</b>{' '}
                  </h3>
                  <p>
                    Compartilhe dicas úteis e ajude a enriquecer o conteúdo da
                    comunidade.
                  </p>
                </div>
              </div>
            </div>

            <div className="border shadow-lg  w-80 rounded-lg min-h-96 p-10">
              <div className="flex flex-col">
                <div>
                  <MessageCircle size={70} className="mb-10" />
                </div>
                <div>
                  <h3 className="font-poppins mb-3 text-xl">
                    <b className="text-blue-400">Interação</b>{' '}
                  </h3>
                  <p>
                    Interaja com outros membros através de postagens
                    interessantes e construtivas.
                  </p>
                </div>
              </div>
            </div>

            <div className="border shadow-lg  w-80 rounded-lg min-h-96 p-10">
              <div className="flex flex-col">
                <div>
                  <Pencil size={70} className="mb-10" />
                </div>
                <div>
                  <h3 className="font-poppins mb-3  text-xl">
                    <b className="text-blue-400">Publicação</b>{' '}
                  </h3>
                  <p>
                    Publique suas ideias e opiniões e contribua para a
                    comunidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
