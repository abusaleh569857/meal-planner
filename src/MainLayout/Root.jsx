import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/NavBar";

const Root = () => {
  return (
    <div className="m-5">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
