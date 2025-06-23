import { Bell, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Components/AuthContext";


export default function UserNavbar() {
  // const [user, setUser] = useState(null);
    const { user } = useAuth;
  const [loading, setLoading] = useState(true); // for skeleton

  useEffect(() => {
  
    axios.get("http://localhost:8000/sanctum/csrf-cookie", { withCredentials: true })
  .then(() => {
    return axios.get("http://localhost:8000/api/user", { withCredentials: true });
  })
  .then((res) =>{
    setUser(res.data)
  setLoading(false);
  })
  .catch((err) => {
    setLoading(false);
    console.error("User fetch failed", err)
  });

      // .get("http://127.0.0.1:8000/api/user", { withCredentials: true })
      // .then((res) => {
      //   setUser(res.data);
      //   setLoading(false);
      // })
      // .catch((err) => {
      //   console.error("User fetch failed", err);
      //   setLoading(false);
      // });
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between shadow-sm">
      <h1 className="text-xl font-bold text-blue-600">ECEF</h1>
      <div className="flex items-center gap-4">
        <button className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600">
          <Bell size={20} />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {loading ? (
          <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        ) : (
          <div className="text-sm font-medium text-gray-800 dark:text-white">
            {user?.firstname} {user?.lastname}
          </div>
        )}

        <button className="text-gray-600 dark:text-gray-300 hover:text-red-600">
          <Link to="/logout">
            <LogOut size={20} />
          </Link>
        </button>
      </div>
    </header>
  );
}
