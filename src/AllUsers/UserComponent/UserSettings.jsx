import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, User, LogOut, Bell, Sun, Moon, X, MarsStrokeIcon, ShieldCheck, MailOpen, PersonStanding, PhoneIncoming, MapPin } from "lucide-react";
import axios from "axios";
import { useMessage } from "../../Components/MessageContext";
import { useAuth } from "../../Components/AuthContext";

export default function UserSettings() {
  const { showMessage } = useMessage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [visible, setVisible] = useState(true);

    const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const scrollTimeout = useRef(null);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone_number: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });

  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://ecef.nhsurulere.site/api/user/settings",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const response = await axios.put(
      //   "http://127.0.0.1:8000/api/user/settings",
      //   formData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      showMessage(response.data.message, "success");
    } catch (error) {
      showMessage(error.response.data.message, "error");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://ecef.nhsurulere.site/api/user/password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showMessage(response.data.message, "success");
    } catch (error) {
      showMessage(error.response.data.message, "error");
    }
  };


  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setVisible(currentScroll < lastScrollTop);
      lastScrollTop = currentScroll;
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setVisible(false), 2000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  const icons = [
    { icon: User, label: "Profile", key: "profile", badge: 0 },
    { icon: Bell, label: "Notifications", key: "notifications", badge: 3 },
    { icon: Settings, label: "Settings", key: "preferences", badge: 0 },
    { icon: LogOut, label: "Security", key: "security", badge: 0 },
  ];

  const tabs = [
    { key: "profile", label: "Profile Info" },
    { key: "security", label: "Password & Security" },
    { key: "notifications", label: "Notifications" },
    { key: "preferences", label: "Preferences" },
  ];

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 shadow-lg py-2 px-6 flex justify-around md:hidden z-50 rounded-t-2xl"
          >
            {icons.map(({ icon: Icon, label, key, badge }) => (
              <motion.button
                key={label}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.4, rotate: 10 }}
                onClick={() => setActiveTab(key)}
                className={`relative flex flex-col items-center text-xs font-medium transition-colors duration-200 ${
                  activeTab === key
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-white"
                }`}
              >
                <motion.div
                  initial={false}
                  animate={{ scale: activeTab === key ? 1.4 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-6 h-6 mb-1" />
                </motion.div>
                {badge > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-[10px] rounded-full px-1">
                    {badge}
                  </span>
                )}
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="max-w-3xl bg-slate-300 dark:bg-slate-900 shadow-xl shadow-black rounded-xl mx-auto p-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 dark:text-white">User Settings</h2>

        <div className="hidden md:flex gap-4 mb-6 border-b dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2 border-b-2 transition-colors duration-200 ${
                activeTab === tab.key
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-600 dark:text-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {activeTab === "profile" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-gray-700 dark:text-white">First Name</span>
                  <input
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:text-white dark:bg-gray-700"
                    type="text"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 dark:text-white">Last Name</span>
                  <input
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-700"
                    type="text"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 dark:text-white">Phone Number</span>
                  <input
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-700"
                    type="text"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 dark:text-white">Email</span>
                  <input
                    value={formData.email || 'Coming soon'}
                    disabled
                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-700"
                    type="email"
                  />
                </label>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 active:scale-[1.02] active:bg-slate-600 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Update Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(true)}
                    className="px-4 py-2 active:scale-[1.02] active:bg-slate-600 bg-gray-800 text-white rounded hover:bg-gray-700"
                  >
                    View Profile
                  </button>
                </div>
              </form>
            )}

            {activeTab === "security" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-gray-700 dark:text-white">Current Password</span>
                  <input
                    name="current_password"
                    value={passwordData.current_password}
                    onChange={handlePasswordChange}
                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-400"
                    type="password"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 dark:text-white">New Password</span>
                  <input
                    name="new_password"
                    value={passwordData.new_password}
                    onChange={handlePasswordChange}
                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-400"
                    type="password"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 dark:text-white">Confirm New Password</span>
                  <input
                    name="confirm_password"
                    value={passwordData.confirm_password}
                    onChange={handlePasswordChange}
                    className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-400"
                    type="password"
                  />
                </label>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 active:scale-[1.02] active:bg-slate-500 text-white rounded hover:bg-blue-700 transition"
                >
                  Change Password
                </button>
              </form>
            )}

            {activeTab === "notifications" && (
              <>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-white">Email Notifications</span>
                  <input type="checkbox" className="toggle toggle-primary" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-white">SMS Alerts</span>
                  <input type="checkbox" className="toggle toggle-primary" />
                </label>
              </>
            )}

            {activeTab === "preferences" && (
              <>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-white">Dark Mode</span>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded bg-blue-600 active:animate-ping dark:bg- hover:bg-blue-900 dark:hover:bg-gray-600"
                  >
                    {darkMode ? <Sun className="w-5 h-5 text-yellow-400 animate-wiggle"   /> : <Moon className="w-5 h-5 animate-wiggle text-gray-200 " />}
                  </button>
                </label>
                <label className="block">
                  <span className="text-gray-700 dark:text-white">Language</span>
                  <select className="w-full mt-1 p-2 rounded bg-gray-100 dark:bg-gray-400">
                    <option>English</option>
                    <option>Igbo</option>
                    <option>Hausa</option>
                    <option>Yoruba</option>
                  </select>
                </label>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-transparent backdrop-blur-md bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              className=" dark:bg-transparent backdrop-blur-lg bg-transparent p-6 rounded-lg w-full max-w-md relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-red-500"
                onClick={() => setShowProfileModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Profile Overview</h3>
              <div className="flex">
                <div><PersonStanding className="w-5 h-5 mr-2 text-blue-500" /></div>
                <p className="text-sm dark:text-white pb-3"><strong className="text-[15px]"></strong> {user.firstname} {user.lastname}</p>

              </div>
              <div className="flex">
                <div><MailOpen className="w-5 h-5 mr-2 text-blue-500" /></div>
                <p className="text-sm dark:text-white pb-3"><strong className=""></strong> {user.email}</p>
              </div>

              <div className="flex">
                <div><PhoneIncoming className="w-5 h-5 mr-2 text-green-500" /></div>
                <p className="text-sm dark:text-white pb-3"><strong className="text-[15px]"></strong> {user.phone_number}</p>
              </div>

              <div className="flex">
                <div><MapPin className="w-5 h-5 mr-2 text-red-600" /></div>
                <p className="text-sm dark:text-white pb-3"><strong className="text-[15px]"></strong> {user.province}</p>
              </div>
              <div className="flex">
                <div><MapPin className="w-5 h-5 mr-2 text-red-600" /></div>
                <p className="text-sm dark:text-white pb-3"><strong className="text-[15px]"></strong> {user.branch}</p>
              </div>
              <div className="flex">
                <div><ShieldCheck className="w-5 h-5 mr-2 text-green-500" /></div>
                <p className="text-sm dark:text-white pb-3"><strong className="text-[15px]">Verified</strong></p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
