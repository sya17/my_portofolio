// "use client";
import FooterSection from "../components/footerSection";
import HeaderSection from "../components/headerSection";
import { AiOutlineDown } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import profilePic from "../../../public/profile_sya.jpg";
// import { useRef } from "react";

const resume = () => {
  // const sectionRef = useRef(null);

  // const handleScrollToNext = () => {
  //   console.log("SCROLLLL");
  //   sectionRef.current.scrollIntoView({ behavior: "smooth" });
  // };
  // const seed = Math.round(Math.random() * 100);

  return (
    <body className="flex flex-col min-h-screen font-mono">
      <HeaderSection />
      <div className="flex-1 w-full py-4 px-6 overflow-y-auto flex justify-center items-center ">
        <div className="flex flex-col w-full overflow-y-auto space-y-1">

          <section className="w-full flex-col flex justify-center items-center space-y-4 h-screen">
            <span className="text-7xl">RESUME</span>
            <div className="space-x-2 flex">
              <Link href="/">
                <span className="hover:underline">Home</span>
              </Link>
              <span>/</span>
              <span>Resume</span>
            </div>
            <div className="cursor-pointer">
              {/* <button onClick={handleScrollToNext}> */}
              <button>
                <AiOutlineDown className="animate-bounce z-0" />
              </button>
            </div>
          </section>

          <section
            // ref={sectionRef}
            className="w-full h-screen flex justify-center items-center px-4 py-0 md:py-24"
          >
            <div className="w-full h-full flex flex-col md:flex-row ">
              <div className="w-full md:w-1/5 h-full flex flex-col ">
                <div className="w-full h-1/5 flex justify-center md:justify-end items-center px-4">
                  <span className="underline">About Me</span>
                </div>
                <div className="w-full h-full flex justify-center md:justify-end px-4 py-5">
                  <Image
                    className="h-20 w-20 rounded-full bg-gray-300"
                    // src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
                    src={profilePic}
                    alt=""
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
              <div className="w-full h-full flex flex-col ">
                <div className="w-full h-2/3 "></div>
                <div className="w-full h-full flex justify-start items-center text-justify">
                  <p>
                    Saya bekerja di Startup Industri IT selama kurang lebih 2
                    tahun, memiliki pengalaman dalam pengembangan web aplikasi.
                    Di dalam peran yang saya miliki, saya dengan sukses
                    mengembangkan beberapa aplikasi seperti tools ITSM, platform
                    pembelajaran dan aplikasi marketplace.
                  </p>
                </div>
                <div className="w-full h-full flex flex-col ">
                  <div className="w-full h-full flex flex-col md:flex-row ">
                    <div className="w-full md:w-3/4 h-full inline-flex justify-start items-center  py-3 md:py-0 ">
                      <span>Name:&nbsp;</span>
                      <span>Sarip Hidayatullah</span>
                    </div>
                    <div className="w-full md:w-3/4 h-full inline-flex justify-start items-center  py-3 md:py-0 ">
                      <span>Age:&nbsp;</span>
                      <span>21 Years</span>
                    </div>
                    <div className="w-full h-full inline-flex justify-start items-center  py-3 md:py-0 ">
                      <span>Job:&nbsp;</span>
                      <span>Java Developer</span>
                    </div>
                  </div>
                  <div className="w-full h-full flex flex-col md:flex-row ">
                    <div className="w-full md:w-3/4 h-full inline-flex justify-start items-center  py-3 md:py-0 ">
                      <span>Citizenship:&nbsp;</span>
                      <span>Indonesia</span>
                    </div>
                    <div className="w-full md:w-3/4 h-full inline-flex justify-start items-center  py-3 md:py-0 ">
                      <span>Residence:&nbsp;</span>
                      <span>Jakarta</span>
                    </div>
                    <div className="w-full h-full inline-flex justify-start items-center  py-3 md:py-0 ">
                      <span className="">E-mail:&nbsp;</span>
                      <span>srphdyt17@gmail.com</span>
                    </div>
                  </div>
                </div>
                <div className="w-full h-full flex justify-start items-center ">
                  <button className="border px-4 py-3 hover:bg-gray-300 hover:text-black ">Download CV</button>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full h-screen flex justify-center items-center border">
            <div className="w-full h-full flex flex-row">
              <div className="w-full h-full ">1</div>
              <div className="w-full h-full ">2</div>
            </div>
          </section>
        </div>
      </div>
      <FooterSection />
    </body>
  );
};

export default resume;
