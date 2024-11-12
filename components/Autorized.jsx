import React from "react";
import Link from "next/link";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">
        401 - you are not authorized ro access this page
      </h1>
      <p className="text-lg mb-8">Please log in to access this page.</p>
      <Link href="/" passHref>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default Unauthorized;
