import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-center px-4"
    >
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Thank You for Your Donation!
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Your transaction was successful.
      </p>
      {reference && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Reference: <span className="font-mono">{reference}</span>
        </p>
      )}
      <a
        href="/dashboard"
        className="mt-6 text-blue-600 hover:underline dark:text-blue-400"
      >
        Go back to homepage
      </a>
    </motion.div>
  );
}
