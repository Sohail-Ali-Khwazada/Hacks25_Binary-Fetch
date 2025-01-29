import React from "react";

export function Navbar() {
  return (
    <nav className="bg-purple-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-white text-xl font-bold">POSTIFY</a>
        <ul className="flex space-x-6">
          <li><a href="http://localhost:5173/analytics" className="text-white hover:text-gray-200">Home</a></li>
          <li><a href="http://localhost:5173/about" className="text-white hover:text-gray-200">About</a></li>
          <li><a href="http://localhost:5173/services" className="text-white hover:text-gray-200">Services</a></li>
          <li><a href="#" className="text-white hover:text-gray-200">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
