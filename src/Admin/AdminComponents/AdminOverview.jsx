import { useEffect, useState } from "react";
import { Users, CreditCard, Activity } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: <Users size={20} />, label: "Total Users", value: 1245 },
  { icon: <CreditCard size={20} />, label: "Total Donations", value: "₦1,200,000" },
  { icon: <Activity size={20} />, label: "Recent Activity", value: "25 this week" },
];

export default function AdminOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
