import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";

export default function UserSidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const toggleSidebar = () => setOpen(!open);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { to: "/dashboard", label: "Overview" },
    { to: "/dashboard/donate", label: "Make a Donation" },
    { to: "/dashboard/history", label: "Payment History" },
  ];

  return (
    <div className="md:w-64 w-full md:relative z-50">
      <div className="md:hidden p-4 bg-white dark:bg-gray-900 flex justify-between items-center shadow fixed top-0 left-0 w-full z-50">
        <h1 className="text-lg font-bold text-blue-600">ECEF</h1>
        <button onClick={toggleSidebar} className="dark:text-white active:scale-[1.09] active:text-blue-500">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {(open || isDesktop) && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 p-6 shadow-lg z-40 overflow-hidden"
          >
            <div className="md:mt-0 mt-14">
              <h2 className="text-xl font-bold text-blue-600 mb-6">
                ECEF Dashboard
              </h2>
              <nav className="space-y-4">
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-4 py-2 rounded-lg transition hover:bg-blue-100 dark:hover:bg-blue-900 ${
                      location.pathname === link.to
                        ? "bg-blue-600 text-white"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <button className=" absolute md:hidden  bottom-5 block left-8 px-4 py-2 rounded-lg transition hover:bg-blue-700 dark:hover:bg-blue-700 dark:text-white">
                  <Link to="/logout">
                    <LogOut size={20} />
                  </Link>
                </button>
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
