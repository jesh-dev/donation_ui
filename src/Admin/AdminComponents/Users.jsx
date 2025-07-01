import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login.");

        const response = await axios.get("http://127.0.0.1:8000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data.users); // Assuming response returns `{ users: [...] }`
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("⚠️ Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">All Users</h2>

      {loading && <p className="text-gray-500 dark:text-gray-400">Loading users...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                    {user.firstname} {user.lastname}
                  </td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
