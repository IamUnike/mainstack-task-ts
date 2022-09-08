import { navLinks } from "data/navlinks";
import { useNavContext } from "contexts/NavContext";
import React from "react";

const SideNav = () => {
  const { active, setActive } = useNavContext();

  return (
    <div className=" h-screen text-[#4D5760] custom-scroll-wrapper py-[38px] absolute left-0 lg:w-[20%] lg:border-r-[1px] lg:border-[#EFF1F6]">
      <div className="px-[60px] ">
        <img src="/img/mainstack-logo.png" />
      </div>

      <nav className="mt-[50px]">
        {navLinks.map((nav) => {
          if (!nav?.subLinks) {
            return (
              <div
                key={Math?.random()}
                className={`mb-6 pl-16 text-base  cursor-pointer flex items-center gap-4
                    ${
                      nav?.name === active &&
                      " text-primary border-l-[2px] border-l-primary "
                    }`}
                onClick={() => setActive(nav?.name)}
              >
                <div>{nav?.icon}</div>
                <div className="font-medium">{nav.name}</div>
              </div>
            );
          } else if (!!nav?.subLinks && nav?.subLinks?.length > 0) {
            return (
              <div
                key={Math.random()}
                className="text-xs pl-16 mt-2 text-[#4D5760] "
              >
                <div className="mb-5">{nav.name}</div>
                {nav?.subLinks?.map((subLink) => (
                  <div
                    className={`mb-6 text-base cursor-pointer flex items-center gap-4
                    ${
                      nav?.name === active &&
                      " text-primary border-l-[2px] border-l-primary "
                    }`}
                    onClick={() => setActive(subLink?.name)}
                    key={Math?.random()}
                  >
                    <div>{subLink?.icon}</div>
                    <div className="font-medium">{subLink.name}</div>
                  </div>
                ))}
              </div>
            );
          }
        })}
      </nav>

      <div className="mt-52">
        <div className="flex gap-3 items-center ml-16 ">
          <img className="rounded-full w-8 h-8" src="/img/blessing.png" />
          <p className="font-medium">Blessing Daniels</p>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
