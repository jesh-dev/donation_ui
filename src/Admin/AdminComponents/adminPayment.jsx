import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Simulate fetch - replace with: axios.get("/api/admin/payments")
    const fakePayments = [
      { id: 1, amount: "5000", reference: "pay001", email: "john@example.com", date: "2024-05-01" },
      { id: 2, amount: "12000", reference: "pay002", email: "jane@example.com", date: "2024-06-15" },
    ];
    setTimeout(() => setPayments(fakePayments), 500);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">All Payments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="px-4 py-2">Donor</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Reference</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, idx) => (
              <motion.tr
                key={pay.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{pay.email}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">₦{pay.amount}</td>
                <td className="px-4 py-2 text-blue-600 dark:text-blue-400">{pay.reference}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{pay.date}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
