"use client";
import FooterSection from "../components/footerSection";
import HeaderSection from "../components/headerSection";
import { AiOutlineDown } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import profilePic from "../../../public/profile_sya.jpg";
import { useRef } from "react";

const resume = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <body className="flex flex-col min-h-screen font-mono bg-black ">
      <HeaderSection />
      <div className="flex-1 w-full py-4 px-6 overflow-y-auto flex justify-center items-center text-white ">
        <div className="flex flex-col w-full overflow-y-auto space-y-8">
          <section className="w-full flex-col flex justify-center items-center space-y-4 h-screen text-white">
            <span className="text-7xl">RESUME</span>
            <div className="space-x-2 flex">
              <Link href="/">
                <span className="hover:underline">Home</span>
              </Link>
              <span>/</span>
              <span>Resume</span>
            </div>
            <div className="cursor-pointer">
              <button onClick={handleClick}>
              {/* <button> */}
                <AiOutlineDown className="animate-bounce z-0" />
              </button>
            </div>
          </section>

          <section
            ref={ref}
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
                      <span className="px-2">Name:</span>
                      <span>Sarip Hidayatullah</span>
                    </div>
                    <div className="w-full md:w-3/4 h-full inline-flex justify-start items-center  py-3 md:py-0 ">
                      <span className="px-2">Age:</span>
                      <span>21 Years</span>
                    </div>
                    <div className="w-full h-full inline-flex justify-start items-center  py-3 md:py-0 ">
                      <span className="px-2">Job:</span>
                      <span>Java Developer</span>
                    </div>
                  </div>
                  <div className="w-full h-full flex flex-col md:flex-row ">
                    <div className="w-full md:w-3/4 h-full inline-flex justify-start items-center  py-3 md:py-0 ">
                      <span className="px-2">Citizenship:</span>
                      <span>Indonesia</span>
                    </div>
                    <div className="w-full md:w-3/4 h-full inline-flex justify-start items-center  py-3 md:py-0 ">
                      <span className="px-2">Residence:</span>
                      <span>Jakarta</span>
                    </div>
                    <div className="w-full h-full inline-flex justify-start items-center  py-3 md:py-0 ">
                      <span className="px-2">E-mail: </span>
                      <span>srphdyt17@gmail.com</span>
                    </div>
                  </div>
                </div>
                <div className="w-full h-full flex justify-start items-center ">
                  <button className="border px-4 py-3 hover:bg-gray-300 hover:text-black ">
                    Download CV
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full h-screen flex justify-center items-center ">
            <div className="w-full h-full flex flex-col md:flex-row py-4 px-2 space-y-8">

              <div className="w-full h-full flex flex-col space-y-3 ">
                <span className="underline">Education</span>
                <div className="flex flex-row">
                  <div className="w-10 "></div>
                  <div className="space-y-2 flex flex-col ">
                    <div className="border px-2 py-1 w-fit ">2017-2020</div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-md">SMKN 1 Cikaum</span>
                      <span className="text-sm">Rekayasa Perangkat Lunak</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full flex flex-col space-y-3 ">
                <span className="underline">Experience</span>
                <div className="flex flex-row">
                  <div className="w-10 "></div>
                  <div className="space-y-2 flex flex-col ">
                    <div className="border px-2 py-1 w-fit ">2021-Now</div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-md">
                        PT. Lemurian Inovasi Teknologi
                      </span>
                      <span className="text-sm">Java Developer</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full flex flex-col space-y-3 ">
                <span className="underline">Projects</span>

                <div className="w-full  flex flex-col">
                  <div className="w-full h-full ">
                    <div className="flex flex-row">
                      <div className="w-10 pt-6">
                        <div className="w-4/6 border-l-2 border-t-2 h-full float-right" />
                      </div>

                      <div className="space-y-2 flex flex-col py-2 w-full">
                        <div className="flex flex-row justify-start items-center">
                          <div className="border px-2 py-1 w-fit ">2021</div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-lg">
                            Bank Syariah Mandiri (BSM)
                          </span>
                          <span className="text-sm">
                            Implementasi Modul Incident & Request ITSM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full ">
                    <div className="flex flex-row">
                      <div className="w-10 py-0">
                        <div className="w-4/6 border-l-2 border-t-0 border-b-2 h-6 float-right" />
                        <div className="w-4/6 border-l-2 border-t-0 h-full float-right" />
                      </div>

                      <div className="space-y-2 flex flex-col py-2 w-full">
                        <div className="border px-2 py-1 w-fit ">2021</div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-lg">Project Internal</span>
                          <span className="text-sm">
                            Mengembangkan aplikasi Assessment Center
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full ">
                    <div className="flex flex-row">
                      <div className="w-10 py-0">
                        <div className="w-4/6 border-l-2 border-t-0 border-b-2 h-6 float-right" />
                        <div className="w-4/6 border-l-2 border-t-0 h-full float-right" />
                      </div>

                      <div className="space-y-2 flex flex-col py-2 w-full">
                        <div className="border px-2 py-1 w-fit ">2021</div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-lg">Project Internal</span>
                          <span className="text-sm">Development Modul CRM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full ">
                    <div className="flex flex-row">
                      <div className="w-10 py-0">
                        <div className="w-4/6 border-l-2 border-t-0 border-b-2 h-6 float-right" />
                        <div className="w-4/6 border-l-2 border-t-0 h-full float-right" />
                      </div>

                      <div className="space-y-2 flex flex-col py-2 w-full">
                        <div className="border px-2 py-1 w-fit ">2021</div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-lg">Project Internal</span>
                          <span className="text-sm">
                            Development ESTIM Dayak
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full ">
                    <div className="flex flex-row">
                      <div className="w-10 py-0">
                        <div className="w-4/6 border-l-2 border-t-0 border-b-2 h-6 float-right" />
                        <div className="w-4/6 border-l-2 border-t-0 h-full float-right" />
                      </div>

                      <div className="space-y-2 flex flex-col py-2 w-full">
                        <div className="border px-2 py-1 w-fit ">2021</div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-lg">Project Internal</span>
                          <span className="text-sm">
                            Development Rantaipasok
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full ">
                    <div className="flex flex-row">
                      <div className="w-10 py-0">
                        <div className="w-4/6 border-l-2 border-t-0 border-b-2 h-6 float-right" />
                        <div className="w-4/6 border-l-2 border-t-0 h-full float-right" />
                      </div>

                      <div className="space-y-2 flex flex-col py-2 w-full">
                        <div className="border px-2 py-1 w-fit ">2022</div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-lg">
                            PT Aplikanusa Lintasarta
                          </span>
                          <span className="text-sm">
                            Development Aplikasi Ultima
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full ">
                    <div className="flex flex-row">
                      <div className="w-10 py-0 ">
                        <div className="w-4/6 border-l-2 border-t-0 border-b-2 h-6 float-right" />
                        <div className="w-4/6 border-l-2 border-t-0 h-full float-right" />
                      </div>

                      <div className="space-y-2 flex flex-col py-2 w-full">
                        <div className="border px-2 py-1 w-fit ">2022</div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-lg">
                            PT. Pelindo Terminal Petikemas (PTP)
                          </span>
                          <span className="text-sm">
                            Implementasi ESTIM SPTP
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full ">
                    <div className="flex flex-row">
                      <div className="w-10 py-0">
                        <div className="w-4/6 border-l-2 border-t-0 border-b-2 h-6 float-right" />
                        {/* <div className="w-4/6 border-l-2 border-t-0 h-full float-right" /> */}
                      </div>

                      <div className="space-y-2 flex flex-col py-2 w-full">
                        <div className="border px-2 py-1 w-fit ">2022</div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-lg">
                            PT Aplikanusa Lintasarta
                          </span>
                          <span className="text-sm break-all hyphens-auto whitespace-normal">
                            Development dan implementasi module complaint dan
                            integrasi dengan crm
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <FooterSection />
    </body>
  );
};

export default resume;
