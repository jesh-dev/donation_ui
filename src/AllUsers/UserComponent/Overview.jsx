import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, CreditCard, TrendingUp } from "lucide-react";
import axiosInstance from "../../Components/axiosInstance"; // your axios with token

export default function DashboardOverview() {
  const [totalUsers, setTotalUsers] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/admin/total-users"); // ← create this endpoint
        setTotalUsers(res.data.count); // response should be: { count: 1234 }
      } catch (err) {
        console.error("Failed to fetch total users", err);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      label: "Total Users",
      value: totalUsers !== null ? totalUsers.toLocaleString() : "Loading...",
      icon: <User size={28} className="text-blue-600" />,
    },
    {
      label: "Total Donations",
      value: "₦980,000", // Make dynamic later if needed
      icon: <CreditCard size={28} className="text-green-600" />,
    },
    {
      label: "Recent Activity",
      value: "₦25,000", // Make dynamic later if needed
      icon: <TrendingUp size={28} className="text-purple-600" />,
    },
  ];

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow flex items-center gap-4"
        >
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            {item.icon}
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{item.value}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
