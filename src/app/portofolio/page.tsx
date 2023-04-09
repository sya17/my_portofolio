import FooterSection from "../components/footerSection";
import HeaderSection from "../components/headerSection";

const portofolio = () => {
  return (
    <body className="flex flex-col min-h-screen font-mono">
      <HeaderSection />
      <div className="flex-1 w-full py-4 px-6 overflow-y-auto flex justify-center items-center ">
        portofolio Section
      </div>
      <FooterSection />
    </body>
  );
};

export default portofolio;
