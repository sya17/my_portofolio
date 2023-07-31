import HeaderSection from './components/headerSection';
import FooterSection from './components/footerSection';

export default async  function Home() {

  return (
    <body className="flex flex-col min-h-screen font-mono bg-black">
      <HeaderSection/>
      <main className="flex-1 w-full py-4 px-6 overflow-y-auto flex justify-center items-center ">
        <div className=" w-full font-bold text-gray-300 flex justify-center items-center">
          <div className="flex flex-col w-full justify-center items-center space-y-6 font-mono">
            {/* <span className="text-2xl">I&apos;M Sarip</span> */}
            <span className="text-2xl">Sarip Hidayatullah</span>
            <span className="typing-demo text-xl">Programmer Java Developer</span>
          </div>
        </div>
      </main>
      <FooterSection/>
    </body>
  );
}
