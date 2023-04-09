import Link from "next/link";


const HeaderSection = () =>  {

  return (
    <header className="py-4 px-6 shadow-md sticky top-0 bg-black z-50">
      <nav className="my-2">
        <ul className="flex justify-between md:justify-end text-gray-400">
          <li className="mr-6">
            <Link href="/resume" className=" hover:text-gray-600 hover:underline">
              Resume
            </Link>
          </li>
          <li className="mr-6">
            <Link href="/portofolio" className=" hover:text-gray-600 hover:underline">
              Portofolio
            </Link>
          </li>
          <li className="mr-6">
            <Link href="/blog" className=" hover:text-gray-600 hover:underline">
              Blog
            </Link>
          </li>
          <li className="mr-6">
            <Link href="/contact" className=" hover:text-gray-600 hover:underline">
              Contacts
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default HeaderSection;
