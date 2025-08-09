import {
  Contact,
  Home,
  LogIn,
  MailCheck,
  MapPin,
  MessageCircleMore,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-blue-600 dark:bg-black text-white dark:text-gray-300 py-10 px-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center sm:text-left">
        {/* About */}
        <div>
          <h3 className="text-xl md:text-2xl font-extrabold text-white dark:text-blue-400 mb-4">
            ECEF
          </h3>
          <p className="text-sm leading-relaxed text-gray-200 dark:text-gray-400">
            Esocs Centenary Endowment Funds is dedicated to supporting church
            growth, missions, and community impact through generous giving.
          </p>

          {/* Desktop Social Icons */}
          <div className="mt-5 hidden sm:flex justify-start gap-4 text-white dark:text-gray-300">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-blue-500 hover:scale-[2.05] text-blue-200 transition"
            >
              <FaFacebookF size={18} className="hover:animate-wiggle" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-blue-500 hover:scale-[2.05] text-blue-200 transition"
            >
              <FaTwitter size={18} className="hover:animate-wiggle" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:scale-[2.05] transition"
            >
              <FaInstagram size={18} className="hover:animate-pulse" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:scale-[2.05] transition"
            >
              <FaYoutube size={18} className="hover:animate-pulse" />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:scale-[2.05] transition"
            >
              <FaWhatsapp className="hover:animate-wiggle" size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-white dark:text-blue-400 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/"
                className="flex items-center hover:scale-[1.05] justify-center sm:justify-start gap-2 hover:text-yellow-300 transition"
              >
                <Home className="w-5 h-5" /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center hover:scale-[1.05] justify-center sm:justify-start gap-2 hover:text-yellow-300 transition"
              >
                <MessageCircleMore className="w-5 h-5" /> About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center hover:scale-[1.05] justify-center sm:justify-start gap-2 hover:text-yellow-300 transition"
              >
                <Contact className="w-5 h-5" /> Contact
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center hover:scale-[1.05] justify-center sm:justify-start gap-2 hover:text-yellow-300 transition"
              >
                <LogIn className="w-5 h-5" /> Login
              </Link>
            </li>
          </ul>

          {/* Mobile Social Icons */}
          <div className="mt-6 sm:hidden flex justify-center gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-blue-600 hover:scale-[2.05] text-blue-200 transition"
            >
              <FaFacebookF className="hover:animate-wiggle" size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-blue-600 hover:scale-[2.05] text-blue-200 transition"
            >
              <FaTwitter className="hover:animate-wiggle" size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:scale-[2.05] transition"
            >
              <FaInstagram className="hover:animate-wiggle" size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-[2.05] text-red-600 transition"
            >
              <FaYoutube className="hover:animate-wiggle" size={20} />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-white dark:text-blue-400 mb-4">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <MailCheck className="text-yellow-400 animate-pulse w-5 h-5" />
              <span>jeshrunlaw@gmail.com</span>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Phone className="text-green-400 animate-wiggle w-5 h-5" />
              <span>+2347063215227</span>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <MapPin className="text-red-400 w-7 animate-bounce h-7" />
              <span>3 Soloki Avenue, Lagos</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} ECEF. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}
