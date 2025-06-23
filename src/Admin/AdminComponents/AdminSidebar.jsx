import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, CreditCard, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/admin", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { to: "/admin/users", label: "Users", icon: <Users size={18} /> },
  { to: "/admin/payments", label: "Payments", icon: <CreditCard size={18} /> },
];

export default function AdminSidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 dark:text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-md z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:block`}
      >
        <div className="h-16 flex items-center justify-center text-xl font-bold text-blue-600 dark:text-white">
          ECEF Admin
        </div>
        <nav className="mt-4 px-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-gray-100 dark:hover:bg-gray-800
                ${location.pathname === link.to ? "bg-gray-200 dark:bg-gray-800 text-blue-600" : "text-gray-700 dark:text-gray-300"}`}
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}

          <button className=" absolute md:hidden bottom-5 block left-8 px-4 py-2 rounded-lg transition hover:bg-blue-700 dark:hover:bg-blue-700">
                  <Link to="/logout">
                    <LogOut size={20} />
                  </Link>
                </button>
        </nav>
      </aside>
    </>
  );
}
