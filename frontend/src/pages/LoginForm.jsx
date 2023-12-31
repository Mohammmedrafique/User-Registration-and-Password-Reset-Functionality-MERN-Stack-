// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "https://able-dress-production.up.railway.app/api/user/login",
//         {
//           email,
//           password,
//         }
//       );

//       const { token, success, message } = response.data;

//       if (success) {
//         localStorage.setItem("token", token);
//         console.log("Login successful:", message);

//         navigate("/home");
//       } else {
//         setError(message || "Login failed");
//       }
//     } catch (error) {
//       setError("An error occurred during login");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center m-10 mt-20">
//       <div className="w-full max-w-md p-4 bg-white shadow-md rounded-md mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-600 text-sm font-semibold mb-2">
//               Email:
//             </label>
//             <input
//               type="email"
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-600 text-sm font-semibold mb-2">
//               Password:
//             </label>
//             <input
//               type="password"
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           {error && <p className="text-red-500 mb-4">{error}</p>}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
//           >
//             Login
//           </button>
//           <p>
//             <Link to="/forgot-password">Forgot Password</Link>
//           </p>
//         </form>
//         <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none">
//           <Link to="/">Signup</Link>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
// LoginForm.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://able-dress-production.up.railway.app/api/user/login",
        {
          email,
          password,
        }
      );

      const { token, success, message } = response.data;

      if (success) {
        login(token); // Use the login function from AuthContext
        console.log("Login successful:", message);

        navigate("/home");
      } else {
        setError(message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred during login");
    }
  };

  return (
    <div className="flex items-center justify-center m-10 mt-20">
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Password:
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
          <p>
            <Link to="/forgot-password">Forgot Password</Link>
          </p>
        </form>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none">
          <Link to="/">Signup</Link>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
