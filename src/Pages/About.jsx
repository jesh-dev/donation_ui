import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function AboutPage() {
  return (
    <>
    <Navbar/>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-[50vh] bg-cover bg-center bg-no-repeat flex items-center justify-center px-6"
        style={{ backgroundImage: "url('/images/about-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">About ECEF</h1>
          <p className="mt-4 text-lg">Faith, Growth, and Community Impact</p>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-10"
      >
        <div className="max-w-4xl mx-auto">
          <p className="mb-4 text-base md:text-lg">
            Esocs Centenary Endowment Funds (ECEF) is a Christ-centered initiative committed to furthering the gospel and strengthening church projects through intentional giving. Since our establishment in 2003, we’ve been a vessel for change in our community and beyond.
          </p>

          <p className="mb-4 text-base md:text-lg">
            Our vision is to raise a generation of believers who are generous, spirit-filled, and grounded in God's Word. From outreach programs to infrastructure development, ECEF is a platform for lasting kingdom impact.
          </p>

          <div className="my-10">
            <h2 className="text-2xl font-semibold mb-4">Our Leadership</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Pastor John Adewale</strong> – Lead Pastor</li>
              <li><strong>Pastor Sarah Adewale</strong> – Worship & Women’s Ministry</li>
              <li><strong>Pastor James Okafor</strong> – Youth & Outreach</li>
            </ul>
          </div>

          <div className="my-10">
            <h2 className="text-2xl font-semibold mb-4">Our Beliefs</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>We believe in the Trinity – God the Father, Son, and Holy Spirit.</li>
              <li>We believe the Bible is the inspired Word of God.</li>
              <li>We believe in salvation through Jesus Christ alone.</li>
              <li>We believe in the power of prayer, worship, and community.</li>
            </ul>
          </div>

          <div className="text-center mt-12">
            <p className="italic text-lg">"For where two or three gather in my name, there am I with them." — Matthew 18:20</p>
          </div>
        </div>
      </motion.div>
      <Footer/>
    </>
  );
}
