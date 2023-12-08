import { Routes, Route } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Home from "./Home";
const Mroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default Mroutes;
