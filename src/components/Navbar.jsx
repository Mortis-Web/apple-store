import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from './../constants/index';
const Navbar = () => {
  return (
    <header className="flex w-full items-center justify-between bg-white/2.5 px-5 py-5 sm:px-10">
      <nav className="screen-max-width flex w-full">
        <img src={appleImg} alt="appleImg" width={18} height={18} />
        <ul className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((item, index) => (
            <li
              key={index}
              className="text-gray cursor-pointer px-5 duration-300 hover:text-white"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-baseline gap-7 max-sm:flex-1 max-sm:justify-end">
          <img src={searchImg} alt="searchImg" width={18} height={18} />
          <img src={bagImg} alt="bagImg" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
