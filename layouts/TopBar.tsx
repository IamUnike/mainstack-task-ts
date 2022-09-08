import { useNavContext } from "contexts/NavContext";
import React from "react";
import { RiMenu4Line } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import SideNav from "./SideNav";

const TopBar = () => {
  const { active, setShowNav, showNav } = useNavContext();
  return (
    <>
      <div className="py-[22px] px-4 sm:px-8 md:px-[60px] flex items-center gap-5 text-[#131316] ">
        <RiMenu4Line
          className="text-2xl cursor-pointer lg:hidden"
          onClick={() => setShowNav(true)}
        />
        <h3 className="text-xl font-bold text-[#131316]">{active || ""}</h3>
      </div>
      {showNav && (
        <div className="fixed top-0 h-screen w-full bg-[#00000033] lg:hidden">
          <div className="h-full bg-white  w-[320px] relative ease-in-out transition-all duration-500 ">
            <div
              className="absolute right-8 top-8 cursor-pointer "
              onClick={() => setShowNav(false)}
            >
              <GrClose />
            </div>
            <SideNav />
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;
