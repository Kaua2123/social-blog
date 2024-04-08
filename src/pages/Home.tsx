import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';

import social from '../imgs/svg/img-social-home-blue.svg';

import { Forward, MessageCircle, Pencil } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import Footer from '../components/footer';
import Loader from '../components/loader';
import { useEffect, useState } from 'react';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  });

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <>
          <Navbar />

          <div className="shadow-sm bg-gradient-to-br from-white via-white to-blue-100">
            <section className=" max-w-screen-xl mx-auto">
              <div className="lg:grid grid-cols-2 justify-center items-center min-h-screen">
                <div className="mb-28">
                  <div className="flex flex-col lg:justify-center lg:items-start items-center justify-center mt-20">
                    <h1 className="font-poppins font-normal lg:text-6xl text-4xl pb-8">
                      <b className="text-blue-400">Compartilhe</b> aqui
                      <br /> o que pensa
                    </h1>
                    <p className="font-poppins font-normal md:text-lg text-base pb-8">
                      Compartilhe suas ideias, opiniões e experiências com a{' '}
                      <br /> nossa comunidade. Sua voz é importante para nós
                    </p>
                  </div>

                  <div
                    className="flex flex-col items-center lg:flex-row
                  justify-center lg:justify-start lg:gap-8 gap-4
                  w-full"
                  >
                    <Link
                      to={token ? '/posts' : '/login'}
                      className="font-poppins"
                    >
                      <button
                        className="shadow-lg shadow-blue-400 bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400
                transition-all rounded-md lg:w-32 w-56 p-2"
                      >
                        Começar
                      </button>
                    </Link>
                    <HashLink smooth to={'/#sobre'} className="font-poppins">
                      <button
                        className="shadow-lg shadow-blue-400 bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400
                  transition-all rounded-md lg:w-32 w-56 p-2"
                      >
                        Saiba mais
                      </button>
                    </HashLink>
                  </div>
                </div>
                <div className="lg:block mb-28">
                  <img className="" src={social} alt="" />
                </div>
              </div>
            </section>
          </div>

          <div>
            <section className="max-w-screen-xl mx-auto">
              <div
                id="sobre"
                className="flex flex-col text-center justify-center items-center"
              >
                <div className="w-1/2">
                  <h2 className="font-poppins lg:text-5xl text-2xl mt-16 mb-8">
                    Seja bem-vindo ao nosso{' '}
                    <b className="text-blue-400">blog social</b>, onde cada voz
                    é única e importante.
                  </h2>
                  <p className="lg:text-lg font-poppins">
                    Descubra um espaço para compartilhar suas ideias, aprender
                    com os outros e fazer parte de uma comunidade que valoriza a
                    diversidade de pensamentos
                  </p>
                </div>
              </div>

              <div className="lg:grid flex flex-col gap-8 items-center md:grid-cols-3 m-10">
                <div className="md:border md:shadow-lg border  w-80 rounded-lg min-h-96 p-10">
                  <div className="flex flex-col">
                    <div className="flex justify-center lg:justify-start">
                      <Forward size={70} className="mb-10" />
                    </div>
                    <div className="text-center lg:text-left">
                      <h3 className="font-poppins mb-3 md:text-xl">
                        <b className="text-blue-400">Compartilhe</b>{' '}
                      </h3>
                      <p className="">
                        Compartilhe dicas úteis e ajude a enriquecer o conteúdo
                        da comunidade.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:border md:shadow-lg border w-80 rounded-lg min-h-96 p-10">
                  <div className="flex flex-col">
                    <div className="flex justify-center lg:justify-start">
                      <MessageCircle size={70} className="mb-10" />
                    </div>
                    <div className="text-center lg:text-left">
                      <h3 className="font-poppins mb-3 md:text-xl">
                        <b className="text-blue-400">Interação</b>{' '}
                      </h3>
                      <p>
                        Interaja com outros membros através de postagens
                        interessantes e construtivas.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:border md:shadow-lg border w-80 rounded-lg min-h-96 p-10">
                  <div className="flex flex-col">
                    <div className="flex justify-center lg:justify-start">
                      <Pencil size={70} className="mb-10" />
                    </div>
                    <div className="text-center lg:text-left">
                      <h3 className="font-poppins mb-3  md:text-xl">
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
      )}
    </>
  );
}

export default Home;
