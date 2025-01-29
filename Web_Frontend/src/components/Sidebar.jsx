import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, LayoutDashboard, Calendar, FileText, Users } from 'lucide-react';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { CreatePost } from './CreatePost';



export const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [open, setOpen] = useState(false);
  const[isPaneOpen,setIsPaneOpen] = useState(false);



  return (
    <div className="w-64 bg-white p-4">
      <div className="flex items-center gap-2 px-2 py-4">
        <span className="text-xl font-semibold">Postify</span>
      </div>

      <button
        className="w-full bg-purple-500 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-purple-700"
        onClick={() => {
          setOpen(true)
          setIsPaneOpen(true)
        }}
      >
        <Clock className="h-4 w-4" />
        Create Post
      </button>

      <nav className="mt-8 space-y-1">
        <NavItem to="/analytics" icon={<LayoutDashboard className="h-4 w-4" />} isActive={isActive}>
          Dashboard
        </NavItem>

        <NavGroup title="Content">
          <NavItem to="/posts" icon={<FileText className="h-4 w-4" />} isActive={isActive}>
            Posts
          </NavItem>
          <NavItem to="/post-calendar" icon={<Calendar className="h-4 w-4" />} isActive={isActive}>
            Calendar
          </NavItem>
        </NavGroup>

        <NavGroup title="Configuration">
          <NavItem to="/posting-schedule" icon={<Clock className="h-4 w-4" />} isActive={isActive}>
            Posting Schedule
          </NavItem>
          <NavItem to="/accounts" icon={<Users className="h-4 w-4" />} isActive={isActive}>
            Accounts
          </NavItem>
        </NavGroup>
      </nav>

      <CreatePost open={open}  setOpen={setOpen} />
    </div>
  );
};

const NavGroup = ({ title, children }) => (
  <div className="pt-4">
    <h2 className="px-2 text-sm font-medium text-gray-500">{title}</h2>
    <div className="mt-1 space-y-1">{children}</div>
  </div>
);

const NavItem = ({ to, icon, children, isActive }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium ${
      isActive(to) ? 'bg-indigo-50 text-purple-500' : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    {icon}
    {children}
  </Link>
);
