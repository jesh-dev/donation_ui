import { useState } from "react";
import axiosInstance from "../../Components/axiosInstance"; // ✅ your configured Axios
import { motion } from "framer-motion";
import { useAuth } from "../../Components/AuthContext";

export default function MakeDonation({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [pledgeAmount, setPledgeAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth(); // ✅ from context

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return setError("Enter a valid email address");
    if (!amount || isNaN(amount)) return setError("Enter a valid amount");
    if (!pledgeAmount || isNaN(pledgeAmount)) return setError("Enter a valid pledge amount");

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.get("http://127.0.0.1:8000/api/payment/history", {
        email,
        amount,
        pledge_amount: pledgeAmount,
      });

      onSuccess && onSuccess(response.data.payment);
      setEmail("");
      setAmount("");
      setPledgeAmount("");
    } catch (error) {
      console.error("Payment error:", error);
      // setError(
        error?.response?.data?.message || "Something went wrong with the payment."
      // );
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount (₦)"
          className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        <input
          type="text"
          value={pledgeAmount}
          onChange={(e) => setPledgeAmount(e.target.value)}
          placeholder="Enter Pledge Amount (₦)"
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
