import { Routes, Route } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Home from "./Home";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
const Mroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/register" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/reset_password/:id/:token"
          element={<ResetPassword />}
        ></Route>
      </Routes>
    </div>
  );
};

export default Mroutes;
