import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">Shopify Orders Dashboard</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
