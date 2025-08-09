import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function PledgeThankYou() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <CheckCircle className="text-green-600 w-16 h-16 mb-4" />
      <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">
        Thank You for Your Pledge Payment!
      </h1>
      <p className="text-gray-600 max-w-md">
        Your pledge payment was successful. We appreciate your commitment and support. You can view your updated pledge status in your dashboard.
      </p>

      <Link
        to="/dashboard"
        className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md shadow"
      >
        Go to Dashboard
      </Link>
    </motion.div>
  );
}
