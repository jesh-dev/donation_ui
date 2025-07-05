import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function DashboardFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-slate-700 mt-auto w-full px-4 py-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Section */}
        <p className="text-sm">&copy; {new Date().getFullYear()} ECEF Dashboard. All rights reserved.</p>

        {/* Right Section: Social Icons */}
        <div className="flex gap-4 text-gray-500 dark:text-gray-400 text-sm">
          <a href="#" className="hover:text-blue-500 transition">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
