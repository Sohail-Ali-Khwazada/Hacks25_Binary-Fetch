import React from "react";
import logo from "../Logo/POSTIFY.png";

export function Navbar() {
  return (
    <nav className=" p-4 text-black shadow-lg border-b-2 border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with size adjustment */}
        <img src={logo} alt="POSTIFY" className="w-10 rounded-3xl" />

        <ul className="flex space-x-6">
          <li><a href="#" className=" hover:text-gray-200">Home</a></li>
          <li><a href="#" className=" hover:text-gray-200">About</a></li>
          <li><a href="#" className=" hover:text-gray-200">Services</a></li>
          <li><a href="#" className=" hover:text-gray-200">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
