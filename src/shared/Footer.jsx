import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
  FaHeart,
  FaUtensils,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHome,
  FaCalendarAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Meal Plan", path: "/meal-plan", icon: FaCalendarAlt },
    { name: "Shopping Cart", path: "/shopping", icon: FaShoppingCart },
    { name: "Contact Us", path: "/contact", icon: FaEnvelope },
  ];

  const socialLinks = [
    {
      icon: FaFacebookF,
      url: "https://www.facebook.com/abusalehalam.khan",
      color: "hover:bg-blue-600",
      name: "Facebook",
    },
    {
      icon: FaLinkedinIn,
      url: "https://www.linkedin.com/in/abusaleh-alam-khan/",
      color: "hover:bg-blue-700",
      name: "LinkedIn",
    },
    {
      icon: FaGithub,
      url: "https://github.com/abusaleh569857",
      color: "hover:bg-gray-800",
      name: "GitHub",
    },
    {
      icon: FaWhatsapp,
      url: "https://wa.me/01571585335",
      color: "hover:bg-green-500",
      name: "WhatsApp",
    },
  ];

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-2 md:mt-15 border-t-4 border-orange-500 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="space-y-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-3xl font-black text-white group w-fit"
          >
            <div className="bg-orange-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-orange-500/20">
              <FaUtensils className="text-white text-xl" />
            </div>
            <span className="tracking-tight">
              Foodie<span className="text-orange-500">Zone</span>
            </span>
          </Link>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4 text-sm group cursor-default">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shrink-0">
                <FaEnvelope />
              </div>
              <span className="group-hover:text-white transition-colors">
                abusaleh.cse.uiu@gmail.com
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm group cursor-default">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shrink-0">
                <FaPhoneAlt />
              </div>
              <span className="group-hover:text-white transition-colors">
                +8801571585335
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm group cursor-default">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shrink-0">
                <FaMapMarkerAlt />
              </div>
              <span className="group-hover:text-white transition-colors">
                Dhaka, Bangladesh
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-xl mb-8 border-l-4 border-orange-500 pl-4 uppercase tracking-wider">
            Quick Links
          </h3>
          <ul className="space-y-4">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.path}
                  onClick={handleScrollToTop}
                  className="hover:text-orange-400 transition-colors flex items-center gap-3 group text-sm font-medium h-10"
                >
                  <link.icon className="text-gray-500 group-hover:text-orange-500 transition-colors text-lg" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-xl mb-8 border-l-4 border-orange-500 pl-4 uppercase tracking-wider">
            Follow Us
          </h3>
          <ul className="space-y-4">
            {socialLinks.map((social, index) => (
              <li key={index}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group w-fit h-10"
                >
                  <div
                    className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-white transition-all duration-300 ${social.color} shadow-lg group-hover:-translate-y-1 shrink-0`}
                  >
                    <social.icon className="text-lg" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-white transition-colors">
                    {social.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-xl mb-8 border-l-4 border-orange-500 pl-4 uppercase tracking-wider">
            Newsletter
          </h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Subscribe to get the latest recipes delivered directly to your
            inbox.
          </p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-gray-800/50 border border-gray-700 text-gray-200 text-sm px-5 py-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder-gray-500"
              />
              <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
            <button
              type="submit"
              className="w-full bg-linear-to-r from-orange-600 to-red-600 text-white font-bold py-4 mt-2 rounded-xl hover:shadow-lg hover:shadow-orange-600/30 transform active:scale-95 transition-all duration-300 text-sm uppercase tracking-widest"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-4 mt-4 text-center bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-5 text-sm text-gray-500 pb-4">
          <p>&copy; {currentYear} FoodieZone. All rights reserved.</p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Made with</span>
              <FaHeart className="text-red-600 animate-pulse text-lg" />
              <span className="text-gray-600">by</span>
            </div>

            <a
              href="#"
              className="font-extrabold text-lg md:text-xl bg-linear-to-r from-orange-500 via-red-600 to-yellow-500 bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-sm"
            >
              Abusaleh Alam Khan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
