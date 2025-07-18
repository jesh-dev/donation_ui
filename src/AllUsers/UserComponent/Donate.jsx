import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../../Components/AuthContext";
import { useMessage } from "../../Components/MessageContext";

export default function MakeDonation({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { showMessage } = useMessage(); // ✅ Use showMessage from MessageContext
  const { user } = useAuth(); // ✅ Check if user is logged in
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleDonate = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!user) return setError("You must be logged in to donate.");
    if (!validateEmail(email) && !user.email) return setError("Enter a valid email address.");
    if (email !== user.email) return setError("Email does not match your account email.");
    if (!amount || isNaN(amount)) return setError("Enter a valid amount.");
    
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.post(
        "http://192.168.137.163:8000/api/payments",
        { email, amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      // const response = await axios.post(
      //   "http://127.0.0.1:8000/api/payments",
      //   { email, amount },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       Accept: "application/json",
      //     },
      //   }
      // );
  

      if(response.status === 201 && response.data.success) {
        showMessage(response.data.message, 'success')
      }
      setEmail("");
      setAmount("");
    } catch (error) {
      showMessage("Payment error:", error, 'error');
      setError(
        error?.response?.data?.message || "Something went wrong with the payment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#1D24CA] dark:bg-[#1D24CA] p-6 rounded-lg shadow-xl shadow-black"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-100 dark:text-white">Make a Donation</h2>
      <form onSubmit={handleDonate} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className="w-full px-4 py-2 border rounded dark:bg-gray-300 dark:text-black"
        />

        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount (₦)"
          className="w-full px-4 py-2 border rounded dark:bg-gray-300 dark:text-black"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 active:scale-[1.02] active:bg-slate-700 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : "Donate Now"}
        </button>
      </form>
    </motion.div>
  );
}
