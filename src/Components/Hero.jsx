import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative h-[90vh] bg-cover bg-center bg-no-repeat flex items-center justify-center px-6"
      style={{ backgroundImage: "url('../assets/Images/back.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      <div className="relative z-10 text-center text-white max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Empowering the Mission<br /> Through Generosity
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Join us in building the future of the church. Every gift plants a seed of impact.
        </p>
        <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg transition font-medium">
          Donate Now
        </Link>
      </div>
    </motion.section>
  );
}
