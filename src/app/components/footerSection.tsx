import { AiFillLinkedin, AiFillInstagram, AiFillFacebook, AiFillGithub } from 'react-icons/ai';
import { PERSONAL_INFO, getCurrentYear } from '@/lib/constants';

const FooterSection = () => {
  return (
    <footer className="text-white py-4 px-6 flex flex-col justify-center items-center sm:flex sm:flex-row sm:justify-between sm:items-center sticky bottom-0 bg-black">
      <p className="text-center sm:text-left font-mono text-xs">
        &copy; {getCurrentYear()} {PERSONAL_INFO.name}
      </p>
      <div className="text-center text-xl  mt-4 sm:mt-0">
        <div className="w-full inline-flex space-x-4 sm:justify-center sm:items-center">
          <a
            href="https://github.com/sya17"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <AiFillGithub className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/sarip-hidayatullah-75a3231aa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <AiFillLinkedin className="w-5 h-5" />
          </a>
          <a
            href="https://web.facebook.com/syrf17/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Profile"
          >
            <AiFillFacebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/srp_hdyt/?igshid=ZDdkNTZiNTM="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
          >
            <AiFillInstagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
