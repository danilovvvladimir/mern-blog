// ==> Libs imports <===
import { FC } from "react";
import { Outlet } from "react-router-dom";
import Menu from "../Menu/Menu";
// ==> Components imports <===

// ==> Other imports <===
import "./Layout.scss";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  return (
    <>
      <Menu />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
