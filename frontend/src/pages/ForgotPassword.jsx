// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   axios.defaults.withCredentials = true;

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .post("http://localhost:8000/api/user/forgot-password", { email })
//       .then((res) => {
//         if (res.data.Status === "Success") {
//           alert("Password reset link sent to your email");
//           navigate("/login");
//         } else {
//           console.log("Password reset request failed:", res.data.Status);
//         }
//       })
//       .catch((err) => {
//         console.error("Error sending password reset request:", err);
//       });
//   };

//   return (
//     <div className="flex justify-center items-center bg-gray-800 min-h-screen">
//       <div className="bg-white p-8 rounded shadow-lg w-1/3">
//         <h4 className="text-2xl font-bold mb-4">Forgot Password</h4>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-600"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               autoComplete="off"
//               name="email"
//               className="mt-1 p-2 w-full border rounded-md"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-green-500 text-white p-2 w-full rounded-md hover:bg-green-600"
//           >
//             Send
//           </button>
//         </form>
//         <p className="mt-4 text-gray-600">
//           Remember your password?{" "}
//           <Link to="/login" className="text-blue-500">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/user/forgot-password", { email })
      .then((res) => {
        // console.log("Response:", res);
        const status = res.data && res.data.status;
        if (status === "Success") {
          alert("Password reset link sent to your email");
          navigate("/login");
        } else {
          console.log("Password reset request failed:", status);
        }
      })
      .catch((err) => {
        console.error("Error sending password reset request:", err);
      });
  };

  return (
    <div className="flex justify-center items-center bg-gray-800 min-h-screen">
      <div className="bg-white p-8 rounded shadow-lg w-1/3">
        <h4 className="text-2xl font-bold mb-4">Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 w-full rounded-md hover:bg-green-600"
          >
            Send
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
