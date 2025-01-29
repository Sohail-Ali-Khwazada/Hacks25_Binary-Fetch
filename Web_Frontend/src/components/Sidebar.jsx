import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, LayoutDashboard, Calendar, Image, FileText, Users } from 'lucide-react';

export const Sidebar = () => {
  return (
    <div className="w-64 bg-white p-4 min-h-screen">
      <div className="flex items-center gap-2 px-2 py-4">
        {/* <div className="h-8 w-8 rounded-lg bg-indigo-600"></div> */}
        <span className="text-xl font-semibold">Postify</span>
      </div>
      
      <button className="w-full bg-purple-500 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-purple-700">
        <Clock className="h-4 w-4" />
        Create Post
      </button>

      <nav className="mt-8 space-y-1">
        <NavItem to="/analytics" icon={<LayoutDashboard className="h-4 w-4" />}>
          Dashboard
        </NavItem>
        
        <NavGroup title="Content">
          <NavItem to="/posts" icon={<FileText className="h-4 w-4" />}>
            Posts
          </NavItem>
          <NavItem to="/post-calendar" icon={<Calendar className="h-4 w-4" />}>
            Calendar
          </NavItem>
        </NavGroup>
        
        <NavGroup title="Configuration">
          <NavItem to="/posting-schedule" icon={<Clock className="h-4 w-4" />}>
            Posting Schedule
          </NavItem>
          <NavItem to="/accounts" icon={<Users className="h-4 w-4" />}>
            Accounts
          </NavItem>
        </NavGroup>
      </nav>
    </div>
  );
};

const NavGroup = ({ title, children }) => {
  return (
    <div className="pt-4">
      <h2 className="px-2 text-sm font-medium text-gray-500">{title}</h2>
      <div className="mt-1 space-y-1">{children}</div>
    </div>
  );
};

const NavItem = ({ to, icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium ${
        isActive 
          ? "bg-indigo-50 text-purple-500" 
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      {children}
    </Link>
  );
};
