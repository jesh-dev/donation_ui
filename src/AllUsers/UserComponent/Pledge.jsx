import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../Components/AuthContext";
import { motion } from "framer-motion";
import PayPledge from "./PayPledge";

export default function UserPledge() {
  const { user, token } = useAuth();
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [pledge, setPledge] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  

  const fetchPledge = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const res = await axios.get("http://127.0.0.1:8000/api/pledges/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPledge(res.data.pledge);
    } catch (err) {
      setPledge(null); // no active pledge
    }
  };

  const createPledge = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/pledge",
        { amount, due_date: dueDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message);
      setError("");
      fetchPledge();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create pledge");
      setMessage("");
    }
  };

  useEffect(() => {
    fetchPledge();
  }, []);

  return (
    <>
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl dark:text-white font-semibold mb-4">My Pledge</h2>

      {message && <div className="text-green-600 mb-2">{message}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}

      {pledge ? (
          <div className="bg-gray-100 rounded p-4 shadow">
          <p><strong>Amount:</strong> ₦{pledge.amount}</p>
          <p><strong>Amount Paid:</strong> ₦{pledge.amount_paid}</p>
          <p><strong>Due Date:</strong> {pledge.due_date}</p>
          <p><strong>Status:</strong> {pledge.status}</p>
        </div>
      ) : (
          <form onSubmit={createPledge} className="space-y-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            Create Pledge
          </button>
        </form>
      )}
    </div>
              </>
  );
}