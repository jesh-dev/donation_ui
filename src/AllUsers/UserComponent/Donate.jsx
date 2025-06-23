import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function MakeDonation({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return setError("Enter a valid amount");
    setLoading(true);
    setError("");

    try {
      // Simulate successful donation (replace with real API call)
      const fakeResponse = {
        created_at: new Date().toISOString(),
        amount,
        method: "Paystack",
        reference: Math.random().toString(36).substring(2, 10)
      };

      await new Promise((res) => setTimeout(res, 1000));
      onSuccess && onSuccess(fakeResponse);
      setAmount("");
    } catch (err) {
      setError("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Make a Donation</h2>
      <form onSubmit={handleDonate} className="space-y-4">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount (₦)"
          className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : "Donate Now"}
        </button>
      </form>
    </motion.div>
  );
}
