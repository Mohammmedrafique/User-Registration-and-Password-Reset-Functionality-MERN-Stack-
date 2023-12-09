// Navbar.js

import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="#" className="text-white font-bold text-lg">
          Robo
        </Link>
        <div className="space-x-4">
          {isLoggedIn && (
            <Link to="/home" className="text-white">
              Home
            </Link>
          )}
          {!isLoggedIn ? (
            <Link to="/login" className="text-white">
              Login
            </Link>
          ) : (
            <Link to="/logout" className="text-white" onClick={logout}>
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
