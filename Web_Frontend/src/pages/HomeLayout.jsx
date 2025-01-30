import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Sidebar } from "../components/Sidebar";

export const HomeLayout = () => {
  const location = useLocation();
  const hideOnPaths = ['/login', '/'];
  const shouldShowSidebar = !hideOnPaths.includes(location.pathname);

  return (
    <>
      <Navbar />
      <div className="flex">
        {shouldShowSidebar && (
          <Sidebar className="w-36 fixed left-0 h-full" />
        )}
        <div className={`flex-1 page-container ${shouldShowSidebar ? 'ml-2' : ''} min-h-[76.5vh]`}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};