import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import Logo from "../assets/Images/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Glowing effect on scroll
  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        isScrolling
          ? "shadow-lg shadow-blue-400/40 dark:shadow-blue-600/30"
          : "shadow-none"
      } bg-blue-500 dark:bg-black`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 relative">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
              <img
                src={Logo}
                alt="Logo"
                className="h-12 motion-reduce:animate-spin hover:animate-none transition md:h-14"
              />
              {/* <h1 className="text-white absolute left-28 max-sm:hidden xl:hidden top-4">
                ECEF
              </h1> */}
            </Link>
          </div>

          {/* Center Nav Links */}
          <nav className="hidden md:flex space-x-20 dark:text-white text-sm font-medium">
            <Link
              to="/"
              className="text-white hover:animate-pulse active:animate-ping transition"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:animate-pulse active:animate-ping transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white hover:animate-pulse active:animate-ping transition"
            >
              Contact
            </Link>
          </nav>

          {/* Right Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded bg-transparent active:animate-ping hover:bg-blue-900 dark:hover:bg-gray-600"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400 animate-wiggle" />
              ) : (
                <Moon className="w-5 h-5 text-gray-200 animate-wiggle" />
              )}
            </button>
            <Link
              to="/register"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 hover:animate-pulse active:animate-ping transition"
            >
              Sign In/Up
            </Link>
          </div>


          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white active:animate-wiggle hover:animate-pulse dark:text-white"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={closeMenu}
            />

            <motion.aside
              key="sidebar"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-50 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-600">ECEF</h2>
                <button onClick={closeMenu}>
                  <X className="text-gray-700 animate-pulse active:animate-wiggle dark:text-white" />
                </button>
              </div>
              <nav className="flex flex-col space-y-10 text-sm">
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="hover:text-blue-500 dark:text-white active:animate-ping hover:animate-pulse"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="hover:text-blue-500 dark:text-white active:animate-ping hover:animate-pulse"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="hover:text-blue-500 dark:text-white active:animate-ping hover:animate-pulse"
                >
                  Contact
                </Link>
                <hr className="my-4 border-gray-300 dark:border-gray-700" />
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="text-white bg-blue-600 active:animate-ping hover:animate-pulse px-4 py-2 rounded hover:bg-blue-700"
                >
                  Sign In/Up
                </Link>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded bg-transparent active:animate-ping hover:bg-blue-900 dark:hover:bg-gray-600"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-yellow-400 animate-wiggle" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-900 animate-wiggle" />
                  )}
                </button>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
