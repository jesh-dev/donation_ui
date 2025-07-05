import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import back from '../assets/Images/aboutimg.jpg';
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What does ECEF stand for?",
    answer: "ECEF means Esocs Centenary Endowment Funds. It’s a faith-driven platform created to support church growth and empower believers through giving."
  },
  {
    question: "How can I support ECEF?",
    answer: "You can support us by donating, volunteering your time, or partnering with us to spread our mission across communities."
  },
  {
    question: "Is ECEF affiliated with a specific denomination?",
    answer: "ECEF is rooted in Christian values but works with various churches and ministries across denominational lines to achieve kingdom impact."
  },
  {
    question: "Where does the donation go?",
    answer: "All donations are directed toward outreach programs, infrastructure development, scholarship programs, and missionary support efforts under ECEF."
  },
  {
    question: "Can I visit a local office?",
    answer: "Yes, our head office is located at 123 Faith Avenue, Port Harcourt. You're always welcome to visit or schedule a meeting."
  }
];

export default function AboutPage() {
  const [showMore, setShowMore] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <>
      <Navbar />
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-[50vh] bg-cover bg-center bg-no-repeat flex items-center justify-center px-6"
        style={{ backgroundImage: `url(${back})` }}
      >
        <div className="absolute inset-0 bg-transparent backdrop-brightness-50 bg-opacity-50 z-0" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">About ECEF</h1>
          <p className="mt-4 text-lg">Faith, Growth, and Community Impact</p>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-white px-6 py-10"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={false}
            animate={{ height: showMore ? "auto" : 700 }}
            className={`overflow-hidden transition-all duration-700`}
          >
            {/* Paragraphs here remain unchanged */}
           {/* <div className="max-w-4xl mx-auto"> */}
          <div className={`transition-all duration-300 ${showMore ? '' : 'max-h-[700px] overflow-hidden'}`}>
            <p className="mb-4 text-base md:text-lg">
              <i className="text-3xl font-bold">Welcome</i> to Esocs Centenary Endowment Funds (ECEF), a Christ-centered initiative that is devoted to advancing the gospel and empowering church projects through intentional and purposeful giving. Established in 2003, ECEF has served as a transformative vessel for change within our community and beyond, striving to embody the love and teachings of Christ in all our efforts.
            </p>
            <p className="mb-4 text-base md:text-lg">
              At ECEF, we recognize the profound impact that generosity and faith can have on individuals and communities alike. Our mission is deeply rooted in the belief that by pooling our resources and talents, we can foster spiritual growth, nurture community projects, and create impactful outreach programs that spread hope and the message of Jesus Christ. We are dedicated to empowering church initiatives that not only meet immediate needs but also cultivate long-term sustainability and growth.
            </p>
            <p className="mb-4 text-base md:text-lg">
              Our vision is to raise a generation of believers who are not only generous but also spirit-filled and firmly grounded in God's Word. We believe that a committed community of faith can achieve anything when united in purpose and driven by love. To this end, we strive to inspire individuals to embrace a lifestyle of giving that transcends mere financial support—one that encompasses time, energy, and expertise. By encouraging active participation in our initiatives, we aim to build a strong foundation for Christian stewardship.
            </p>
            <p className="mb-4 text-base md:text-lg">
              From our varied outreach programs that touch lives in tangible ways, to substantial infrastructure development that supports local churches, ECEF is a dynamic platform designed for lasting kingdom impact. We work collaboratively with churches, organizations, and individuals who share our passion for service and our commitment to spreading the gospel. Our projects span a wide range of activities, including educational scholarships, community development, disaster relief, and missionary support.
            </p>
            <p className="mb-4 text-base md:text-lg">
              Through our initiatives, we strive to address both the spiritual and practical needs of the people we serve. We provide resources, training, and support to equip local leaders and volunteers, enabling them to make a meaningful difference in their communities. It is our firm belief that by investing in the lives of individuals and equipping them for service, we can create a ripple effect that extends far beyond our immediate reach.
            </p>
            <p className="mb-4 text-base md:text-lg">
              As we look to the future, we are excited about the possibilities that lie ahead. With God’s guidance, we aim to expand our reach and deepen our impact. We invite you to join us on this journey—whether through financial contributions, volunteering your time and skills, or simply spreading the word about our mission. Every action, no matter how small, contributes to the greater vision of uplifting our communities in faith and love.
            </p>
            <p className="mb-4 text-base md:text-lg">
              In conclusion, Esocs Centenary Endowment Funds is more than just an initiative; it is a calling to all believers to step into their purpose and to give selflessly in service to others. We invite you to connect with us, to learn more about our projects, and to discover how you can be part of the transformative work we are doing. Together, let’s make a lasting impact for God’s kingdom!
            </p>
          </div>
          </motion.div>

          <div className="flex justify-center mb-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 text-blue-500 font-semibold hover:underline"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "See Less" : "See More"}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: showMore ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {showMore ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </motion.div>
            </motion.button>
          </div>

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

          <div className="my-10">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="border border-gray-300 dark:border-gray-700 rounded-md p-4"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {openIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.p
                        key="answer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-2 text-sm text-gray-600 dark:text-gray-300"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="italic text-lg">"For where two or three gather in my name, there am I with them." — Matthew 18:20</p>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
