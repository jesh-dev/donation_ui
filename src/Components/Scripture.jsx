import { motion } from "framer-motion";

export default function ScriptureSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-100 dark:bg-gray-800 py-16 px-4 text-center"
    >
      <blockquote className="text-xl md:text-2xl font-medium max-w-3xl mx-auto italic text-gray-700 dark:text-gray-200">
        “Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.”
        <span className="block mt-4 text-base font-normal">— 2 Corinthians 9:7</span>
      </blockquote>
    </motion.section>
  );
}
