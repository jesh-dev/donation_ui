import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 50);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 50);

    return () => clearInterval(interval);
  }, [target, duration]);

  return count;
}

export default function StatsSection() {
  const members = useCountUp(1200);
  const donations = useCountUp(950000);
  const users = useCountUp(320);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
      className="bg-white dark:bg-gray-900 py-16 px-6 text-center"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-800 dark:text-white">
        Our Impact in Numbers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-gray-700 dark:text-gray-200">
        <div>
          <p className="text-5xl font-extrabold text-blue-600">{members}+</p>
          <p className="mt-2 text-lg">Active Members</p>
        </div>
        <div>
          <p className="text-5xl font-extrabold text-blue-600">₦{donations.toLocaleString()}</p>
          <p className="mt-2 text-lg">Total Donations</p>
        </div>
        <div>
          <p className="text-5xl font-extrabold text-blue-600">{users}</p>
          <p className="mt-2 text-lg">Registered Donors</p>
        </div>
      </div>
    </motion.section>
  );
}