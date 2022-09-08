import React, { createContext, useContext, useState } from "react";

export interface NavContextInterface {
  active: string | null;
  setActive: Function;
  showNav: boolean;
  setShowNav: Function;
}

export const NavContext = createContext<NavContextInterface | null>(null);

export const useNavContext = () => {
  return useContext(NavContext) as NavContextInterface;
};

type NavProviderProps = {
  children: React.ReactNode;
};

const NavProvider = ({ children }: NavProviderProps) => {
  const [active, setActive] = useState("");
  const [showNav, setShowNav] = useState(false);

  const values = {
    active,
    setActive,
    showNav,
    setShowNav,
  };

  return <NavContext.Provider value={values}>{children}</NavContext.Provider>;
};

export default NavProvider;
