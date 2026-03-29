import { Link } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className="bg-gray-900 shadow-md p-4 flex justify-between items-center">
      {/* App name */}
      <div className="flex space-x-4 items-center">
        <Link to="/" className="font-bold text-lg text-white hover:underline">
          Food App
        </Link>

        {/* Admin Link */}
        {user?.role === "admin" && (
          <Link to="/admin" className="text-green-400 hover:underline">
            Admin
          </Link>
        )}
      </div>

      <div className="flex space-x-4">
        {!user && (
          <>
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
            <Link to="/signup" className="text-white hover:underline">
              Signup
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="text-white font-medium">Hi, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
