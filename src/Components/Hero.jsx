import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bgImage from '../assets/Images/aboutimg.jpg'; // ✅ Import image directly

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative h-[90vh] bg-cover bg-scroll bg-center bg-no-repeat flex items-center justify-center px-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-transparent backdrop backdrop-brightness-50 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-2xl">
        <motion.h1
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Empowering the Mission<br /> Through Generosity
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Join us in building the future of the church. Every gift plants a seed of impact.
        </motion.p>

        {/* 3D Button */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
            y: -2,
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/register"
            className="bg-gradient-to-r from-blue-500 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md"
          >
            Donate Now
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
