import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Shopify Orders Dashboard</h1>
      <p className="text-gray-600 mb-6">
        View your store's latest 60-day orders and details in one place.
      </p>
      <Link
        to="/dashboard"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Go to Merchant Dashboard
      </Link>
    </div>
  );
};

export default Home;
