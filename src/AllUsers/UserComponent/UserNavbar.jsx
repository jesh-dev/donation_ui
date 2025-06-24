import { Bell, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Components/AuthContext";

export default function UserNavbar() {
  const { user } = useAuth(); // ✅ Use () to call the hook

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between shadow-sm">
      <h1 className="text-xl font-bold text-blue-600">ECEF</h1>

      <div className="flex items-center gap-4">
        <button className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600">
          <Bell size={20} />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {user ? (
          <div className="text-sm font-medium text-gray-800 dark:text-white capitalize">
            {user.firstname} {user.lastname} 
          </div>
        ) : (
          <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        )}

        <Link to="/logout" className="text-gray-600 dark:text-gray-300 hover:text-red-600">
          <LogOut size={20} />
        </Link>
      </div>
    </header>
  );
}
