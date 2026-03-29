import React from "react";
import { Link } from "react-router-dom";

export default function AppLayout({ children, user }) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left sidebar */}
      <div className="w-24 bg-gray-800 flex flex-col items-center py-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-green-600 px-3 py-2 rounded mb-2 text-sm text-center"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 px-3 py-2 rounded text-sm text-center"
            >
              Signup
            </Link>
          </>
        ) : (
          <span className="text-xs text-gray-400 mt-2">Hi, {user.username}</span>
        )}
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
