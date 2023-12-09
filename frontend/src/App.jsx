import Mroutes from "./pages/Mroutes";
import Navbar from "./pages/Navbar";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <div>
      <Navbar />
      <Mroutes />
      <ResetPassword/>
    </div>
  );
};

export default App;
