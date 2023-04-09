import FooterSection from "../components/footerSection";
import HeaderSection from "../components/headerSection";

const blog = () =>{
    return (
        <body className="flex flex-col min-h-screen font-mono">
          <HeaderSection />
          <div className="flex-1 w-full py-4 px-6 overflow-y-auto flex justify-center items-center ">
          blog Section
          </div>
          <FooterSection />
        </body>
    );
}
export default blog;