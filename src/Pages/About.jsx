import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import back from '../assets/Images/aboutimg.jpg'; // ✅ Import image directly


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
        style={{ backgroundImage: `url(${back})` }}
      >
        <div className="absolute inset-0 bg-transparent backdrop-brightness-50 bg-opacity-50 z-0" />
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

<i className="text-3xl font-bold">Welcome</i> to Esocs Centenary Endowment Funds (ECEF), a Christ-centered initiative that is devoted to advancing the gospel and empowering church projects through intentional and purposeful giving. Established in 2003, ECEF has served as a transformative vessel for change within our community and beyond, striving to embody the love and teachings of Christ in all our efforts.

At ECEF, we recognize the profound impact that generosity and faith can have on individuals and communities alike. Our mission is deeply rooted in the belief that by pooling our resources and talents, we can foster spiritual growth, nurture community projects, and create impactful outreach programs that spread hope and the message of Jesus Christ. We are dedicated to empowering church initiatives that not only meet immediate needs but also cultivate long-term sustainability and growth.

Our vision is to raise a generation of believers who are not only generous but also spirit-filled and firmly grounded in God's Word. We believe that a committed community of faith can achieve anything when united in purpose and driven by love. To this end, we strive to inspire individuals to embrace a lifestyle of giving that transcends mere financial support—one that encompasses time, energy, and expertise. By encouraging active participation in our initiatives, we aim to build a strong foundation for Christian stewardship.

From our varied outreach programs that touch lives in tangible ways, to substantial infrastructure development that supports local churches, ECEF is a dynamic platform designed for lasting kingdom impact. We work collaboratively with churches, organizations, and individuals who share our passion for service and our commitment to spreading the gospel. Our projects span a wide range of activities, including educational scholarships, community development, disaster relief, and missionary support.

Through our initiatives, we strive to address both the spiritual and practical needs of the people we serve. We provide resources, training, and support to equip local leaders and volunteers, enabling them to make a meaningful difference in their communities. It is our firm belief that by investing in the lives of individuals and equipping them for service, we can create a ripple effect that extends far beyond our immediate reach.

As we look to the future, we are excited about the possibilities that lie ahead. With God’s guidance, we aim to expand our reach and deepen our impact. We invite you to join us on this journey—whether through financial contributions, volunteering your time and skills, or simply spreading the word about our mission. Every action, no matter how small, contributes to the greater vision of uplifting our communities in faith and love.

In conclusion, Esocs Centenary Endowment Funds is more than just an initiative; it is a calling to all believers to step into their purpose and to give selflessly in service to others. We invite you to connect with us, to learn more about our projects, and to discover how you can be part of the transformative work we are doing. Together, let’s make a lasting impact for God’s kingdom!
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
