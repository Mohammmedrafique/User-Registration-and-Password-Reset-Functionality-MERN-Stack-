import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-lg">
          Robo
        </Link>
        <div className="space-x-4">
          <Link to="/home" className="text-white">
            Home
          </Link>
          <Link to="./login" className="text-white">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
