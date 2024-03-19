import Navbar from './components/Navbar';

import social from './imgs/svg/img-social-home-blue.svg';

function Home() {
  return (
    <>
      <Navbar />
      <section className="h-screen max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 justify-center items-center h-screen">
          <div className="mb-28">
            <p className="font-roboto font-normal text-6xl pb-16">
              Compartilhe aqui
              <br /> o que pensa
            </p>
            <div className="flex flex-row gap-8  w-full">
              <button
                className="shadow-lg shadow-blue-400 bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400
              transition-all rounded-lg w-32 p-2"
              >
                Começar
              </button>
              <button
                className="shadow-lg shadow-blue-400 bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400
                transition-all rounded-lg w-32 p-2"
              >
                Saiba mais
              </button>
            </div>
          </div>
          <div className="mb-28">
            <img className="" src={social} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
