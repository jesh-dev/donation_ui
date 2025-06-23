import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function PaymentHistory({ historyOverride }) {
  const [history, setHistory] = useState([
    {
      id: 1,
      created_at: new Date().toISOString(),
      amount: "5000",
      method: "Paystack",
      reference: "demo001"
    },
    {
      id: 2,
      created_at: new Date().toISOString(),
      amount: "10000",
      method: "Paystack",
      reference: "demo002"
    }
  ]);

  useEffect(() => {
    if (!Array.isArray(historyOverride)) {
      axios.get("/api/payment/history")
        .then(res => {
          if (Array.isArray(res.data)) setHistory(res.data);
        })
        .catch(error => console.error("Error fetching history:", error));
    }
  }, [historyOverride]);

  const records = Array.isArray(historyOverride) ? historyOverride : history;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Payment History</h2>

      {Array.isArray(records) && records.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No payment records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Method</th>
                <th className="px-4 py-2">Reference</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(records) && records.map((item, idx) => (
                <motion.tr
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">₦{item.amount}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{item.method || "Paystack"}</td>
                  <td className="px-4 py-2 text-blue-600 dark:text-blue-400">{item.reference}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
