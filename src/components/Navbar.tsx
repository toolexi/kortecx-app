import { Link } from "@tanstack/react-router";
import kortecx_logo from "../assets/kortecx_icon.png";
import { FaGithub } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { AiFillQuestionCircle } from "react-icons/ai";

export const Navbar = () => {
  return (
    <div className="h-12 bg-black flex items-center px-4 md:px-6 lg:px-8">
      {/* Logo Section */}
      <Link
        to="/"
        className="flex items-center gap-3 text-white font-bold hover:opacity-90 transition-opacity"
      >
        <img
          src={kortecx_logo}
          alt="Kortecx Logo"
          className="h-7 w-7 md:h-8 md:w-8"
        />
        <span className="text-base md:text-lg tracking-tight">Kortecx</span>
      </Link>

      {/* GitHub Link - pushed to right */}
      <div className="ml-auto">
        <a
          href="https://github.com/toolexi/kortecx-app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors"
          aria-label="GitHub Repository"
        >
          <FaGithub className="h-6 w-6 md:h-7 md:w-7" />
        </a>
      </div>
      <div className="absolute bottom-4 right-4 ">
        <a href="https://kortecx.com" target="_blank">
          <Tooltip>
            <TooltipTrigger>
              <AiFillQuestionCircle className=" w-8 h-8 bg-orange-900" />
            </TooltipTrigger>
            <TooltipContent>
              {/* <AiFillQuestionCircle className=" w-8 h-8"/> */}
              Learn more
            </TooltipContent>
          </Tooltip>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
