import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulate fetch - replace with: axios.get("/api/admin/users")
    const fakeUsers = [
      { id: 1, name: "John Doe", email: "john@example.com", joined: "2024-03-01" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", joined: "2024-04-10" },
    ];
    setTimeout(() => setUsers(fakeUsers), 500);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">All Users</h2>
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
                transition={{ delay: idx * 0.1 }}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{user.name}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{user.email}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{user.joined}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
