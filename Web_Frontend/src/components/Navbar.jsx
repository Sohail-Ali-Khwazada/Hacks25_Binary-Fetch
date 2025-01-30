import React from "react";
import logo from "../Logo/POSTIFY.png";
import { Link } from "react-router";

export function Navbar() {
  return (
    <nav className=" p-4 text-black shadow-lg border-b-2 border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with size adjustment */}
        <img src={logo} alt="POSTIFY" className="w-10 rounded-3xl" />

        <ul className="flex space-x-6">
          <Link to="/analytics" className=" hover:text-gray-200">Home</Link>
          <Link to="/about" className=" hover:text-gray-200">About</Link>
          <Link to="/services" className=" hover:text-gray-200">Services</Link>
          <Link to="/contact" className=" hover:text-gray-200">Contact</Link>
        </ul>
      </div>
    </nav>
  );
}
