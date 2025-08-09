import { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useMessage } from "../Components/MessageContext";
import { MailCheck, MapPinCheckIcon, PhoneIncoming } from "lucide-react";
import contactBg from "../assets/Images/aboutimg.jpg";

function ContactPage() {
  const { showMessage } = useMessage("");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Fullname is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.0.1:8000/api/contact", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });
      if (response.status === 200) {
        showMessage(response.data.message, "success");
      }
    } catch (err) {
      showMessage("Failed to send email", "error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative bg-white dark:bg-black flex justify-center items-center p-4">
        <img
          src={contactBg}
          alt="Contact Background"
          className="absolute top-0 left-0 w-full h-full object-cover  dark:opacity- z-0"
        />

        <div className="relative z-10 bg-transparent dark:bg-black/50 mt-20 mb-20 rounded-lg shadow-xl max-w-4xl w-full p-6 md:p-8 sm:p-4 backdrop-blur">
          <h2 className="text-3xl dark:text-white font-bold text-white text-center mb-4">
            Get in Touch
          </h2>
          <p className="text-center dark:text-white text-gray-200 mb-8 max-w-2xl mx-auto text-sm md:text-base">
            We'd love to hear from you! Fill out the form below to send us a message.
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full">
              <label className="mb-2 dark:text-white text-sm font-medium text-white" htmlFor="name">
                Full Name
              </label>
              <input
                required
                autoComplete="none"
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="dark:text-white mb-2 text-sm font-medium text-white" htmlFor="email">
                Email
              </label>
              <input
                required
                autoComplete="none"
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2 flex flex-col w-full">
              <label className="mb-2 dark:text-white text-sm font-medium text-white" htmlFor="subject">
                Subject
              </label>
              <input
                required
                autoComplete="none"
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2 flex flex-col w-full">
              <label className="mb-2 dark:text-white text-sm font-medium text-white" htmlFor="message">
                Message
              </label>
              <textarea
                required
                autoComplete="none"
                rows={5}
                placeholder="Your message..."
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex justify-center mt-4 w-full">
              <button
                type="submit"
                className="w-full sm:w-auto active:animate-ping shadow-blue-500  active:bg-green-500 px-8 py-3 bg-blue-600 hover:bg-blue-700 hover:animate-pulse text-white font-semibold rounded-lg shadow-lg transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start space-x-4">
                <div className="text-blue-600 flex-shrink-0">
                  <MapPinCheckIcon className="w-6 h-6 animate-bounce text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold dark:text-gray-200 text-white text-sm md:text-base">
                    Location
                  </h4>
                  <p className="text-gray-300 dark:text-gray-400 text-xs md:text-sm">
                    123 Main St, City, Country
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <PhoneIncoming className="w-6 h-6 animate-wiggle text-green-500" />
                  <div>
                    <h4 className="font-semibold text-white dark:text-gray-100 text-sm md:text-base">
                      Call us
                    </h4>
                    <p className="text-gray-300 dark:text-gray-400 text-xs md:text-sm">
                      +1 234 567 8900
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MailCheck className="w-6 h-6 text-yellow-500 animate-pulse" />
                  <div>
                    <h4 className="dark:text-gray-100 font-semibold text-white text-sm md:text-base">
                      Email
                    </h4>
                    <p className="text-gray-300 dark:text-gray-400 text-xs md:text-sm">
                      contact@example.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
