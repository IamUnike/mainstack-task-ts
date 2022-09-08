import Head from "next/head";
import React from "react";
import SideNav from "./SideNav";
import TopBar from "./TopBar";

interface ChildrenProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: ChildrenProps) => {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <div className="flex justify-center bg-[#00000011]">
        <div className="w-full max-w-[1440px] bg-white relative">
          <div className="grid grid-cols-10">
            <div className="hidden lg:block h-[100vh] col-span-2">
              <SideNav />
            </div>
            <div className="col-span-10 lg:col-span-8 h-screen custom-scroll-wrapper">
              <TopBar />
              <div className="p-0">
                <div>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
