import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b sticky top-0 left-0 right-0 dark:border-gray-700 flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
      <button
        // onClick={() => alert("Logging out...")}
        className="flex items-center gap-2 text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded hover:bg-red-100 dark:bg-red-900 dark:text-red-300"
      ><Link to="/logout">
         <LogOut size={16} /> Logout
      </Link>
       
      </button>
    </header>
  );
}