import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";

const Root = () => {
  return (
    <div className="m-5">
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
