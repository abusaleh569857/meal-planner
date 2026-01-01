import { NavLink } from "react-router-dom";

const Navbar = () => (
  <nav className="flex gap-6 p-4 border-b">
    <NavLink to="/">Home</NavLink>
    <NavLink to="/meal-plan">Meal Plan</NavLink>
    <NavLink to="/shopping">Shopping List</NavLink>
  </nav>
);

export default Navbar;
