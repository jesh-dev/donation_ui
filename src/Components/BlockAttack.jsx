import { motion } from "framer-motion";

export default function Block() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-800 to-slate-600 text-white px-4 text-center">
      <motion.h1
        className="text-red-500 text-9xl font-extrabold mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl mb-2 font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Page Not Found
      </motion.p>

      <motion.p
        className="text-md text-gray-300 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        You seem lost... maybe head back to safety.
      </motion.p>

      <motion.a
        href="/"
        className="mt-8 inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 shadow-lg"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Go Home
      </motion.a>
    </div>
  );
}
