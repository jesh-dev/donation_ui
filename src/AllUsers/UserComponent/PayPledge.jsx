import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../Components/AuthContext";

export default function PayPledge() {
  const { token } = useAuth();
  const [pledge, setPledge] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();

  const fetchPledge = async () => {
    try {
      const res = await axios.get("https://ecef.nhsurulere.site/api/pledges/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPledge(res.data.pledge);
      setError("");
    } catch (err) {
      setPledge(null);
      setError("No active pledge");
    }
  };

  const initiatePaystack = async (e) => {
    e.preventDefault();
    if (!pledge) return;

    try {
      const res = await axios.post(
        `https://ecef.nhsurulere.site/api/pledge/${pledge.id}/pay`,
        { amount },
        {
          metadata: {
            type: "pledge",
            pledge_id: 7,
            user_id: user.id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.authorization_url) {
        window.location.href = res.data.authorization_url; // Redirect to Paystack
      } else {
        setError("Unable to start payment");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed");
      console.error(err);
      setMessage("");
    }
  };

  useEffect(() => {
    fetchPledge();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold dark:text-white mb-4">Pay </h2>

      {message && <div className="text-green-600 mb-2">{message}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}

      {pledge ? (
        <div className="space-y-4">
          <div className="bg-gray-100 rounded p-4 shadow">
            <p><strong>Amount:</strong> ₦{pledge.amount}</p>
            <p><strong>Paid:</strong> ₦{pledge.amount_paid}</p>
            <p><strong>Remaining:</strong> ₦{pledge.amount - pledge.amount_paid}</p>
          </div>

          <form onSubmit={initiatePaystack} className="space-y-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to pay"
              className="w-full border rounded px-3 py-2"
              required
              max={pledge.amount - pledge.amount_paid}
              min={100}
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Pay
            </button>
          </form>
        </div>
      ) : (
        <p>You have no pending pledge to pay.</p>
      )}
    </div>
  );
}
