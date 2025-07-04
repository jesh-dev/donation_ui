import { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useMessage } from "../Components/MessageContext";
import { MailCheck, MapPinCheckIcon, PhoneIncoming } from "lucide-react";

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

    if (!formData.name.trim()) {
      newErrors.Name = "Fullname is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "email is required";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "subject is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "message is required";
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
      const response = await axios.post("http://127.0.0.1:8000/api/contact", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });
      if (response.status === 200) {
        showMessage(response.data.message, "success");
      }
    } catch (err) {
      // console.log(err);
      showMessage("Failed to send email", "error");
    }
  };

  return (
    <>
      <Navbar />
      <div className=" bg-white dark:bg-slate-800 flex justify-center align-center p-4">
        {/* Container card */}
        <div><img src="" alt="" srcset="" /></div>
        <div className="bg-white mt-20 mb-20 dark:bg-slate-600 rounded-lg shadow-xl max-w-4xl w-full p-6 md:p-8 sm:p-4">
          <h2 className="text-3xl dark:text-white font-bold text-gray-800 text-center mb-4">
            Get in Touch
          </h2>
          <p className="text-center dark:text-white text-gray-600 mb-8 max-w-2xl mx-auto text-sm md:text-base">
            We'd love to hear from you! Fill out the form below to send us a
            message.
          </p>

          {/* Form */}
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div className="flex flex-col w-full">
              <label
                className="mb-2 dark:text-white text-sm font-medium text-gray-700"
                htmlFor="name"
              >
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

            {/* Email */}
            <div className="flex flex-col w-full">
              <label
                className="dark:text-white mb-2 text-sm font-medium text-gray-700"
                htmlFor="email"
              >
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

            {/* Subject (full width on small screens) */}
            <div className="md:col-span-2 flex flex-col w-full">
              <label
                className="mb-2 dark:text-white text-sm font-medium text-gray-700"
                htmlFor="subject"
              >
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

            {/* Message (full width on small screens) */}
            <div className="md:col-span-2 flex flex-col w-full">
              <label
                className="mb-2 dark:text-white text-sm font-medium text-gray-700"
                htmlFor="message"
              >
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

            {/* Submit button full width */}
            <div className="md:col-span-2 flex justify-center mt-4 w-full">
              <button
                type="submit"
                className="w-full sm:w-auto active:animate-ping active:bg-green-500 px-8 py-3 bg-blue-600 hover:bg-blue-700 hover:animate-pulse text-white font-semibold rounded-lg shadow-lg transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Contact info / map, info section (responsive) */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div className="flex flex-col space-y-4">
              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="text-blue-600 flex-shrink-0">
                  {/* Location icon */}
                  <MapPinCheckIcon className="w-6 h-6 animate-pulse text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold dark:text-gray-200 text-gray-800 text-sm md:text-base">
                    Location
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
                    123 Main St, City, Country
                  </p>
                </div>
              </div>
              {/* Phone & Email */}
              <div className="flex flex-col space-y-4">
                {/* Phone */}
                <div className="flex items-center  space-x-4">
                  {/* Phone icon */}
                  <PhoneIncoming className="w-6 h-6 animate-wiggle text-green-500" />
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm md:text-base">
                      Call us
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
                      +1 234 567 8900
                    </p>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-center space-x-4">
                  {/* Email icon */}
                 <MailCheck className="w-6 h-6 text-yellow-500 animate-bounce" />
                  <div>
                    <h4 className="dark:text-gray-100 font-semibold text-gray-800 text-sm md:text-base">
                      Email
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
                      contact@example.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Map / Additional info can go here, also responsive */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
