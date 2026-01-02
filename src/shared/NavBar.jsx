import { NavLink } from "react-router-dom";
import {
  FaUtensils,
  FaHome,
  FaCalendarAlt,
  FaShoppingCart,
} from "react-icons/fa";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Meal Plan", path: "/meal-plan", icon: <FaCalendarAlt /> },
    { name: "Shopping", path: "/shopping", icon: <FaShoppingCart /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="bg-linear-to-tr from-orange-500 to-red-500 text-white p-2 rounded-xl shadow-lg transform group-hover:rotate-12 transition-all duration-300">
              <FaUtensils className="text-xl" />
            </div>
            <span className="text-2xl font-extrabold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent tracking-tight">
              Crave<span className="text-orange-500">Hub</span>
            </span>
          </NavLink>

          <div className="hidden md:flex items-center justify-center">
            <div className="flex bg-gray-100/60 backdrop-blur-sm p-1.5 rounded-full border border-gray-200/50 shadow-inner gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-white text-orange-600 shadow-md transform scale-105"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                    }`
                  }
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-500 hover:text-orange-500 font-semibold text-sm transition-colors">
              Log In
            </button>
            <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-orange-600 hover:shadow-orange-500/30 transition-all duration-300">
              Sign Up
            </button>
          </div>

          <div className="md:hidden text-gray-600">Menu</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
