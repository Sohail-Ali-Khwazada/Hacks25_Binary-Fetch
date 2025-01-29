import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Sidebar } from "../components/Sidebar";

export const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar className="w-64 fixed left-0 h-full" />
        <div className="ml-2 flex-1 page-container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};
