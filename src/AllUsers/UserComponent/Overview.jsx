import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useMessage } from "../../Components/MessageContext";
import DashboardFooter from "./userFooter";

export default function DonationOverview() {
  const { showMessage } = useMessage();

  const [data, setData] = useState({
    totalAmount: 0,
    totalDonors: 0,
    recent: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:8000/api/userOverview", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        setData(res.data);
      } catch (err) {
        showMessage("Failed to load overview.", "error");
        console.error(err.response?.data || err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      className="p-4 md:p-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold bg-gradient-to-tr from-violet-500 to-green-500 bg-clip-text text-transparent mb-8">Donation Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1D24CA] dark:bg-[#1D24CA]  rounded-2xl shadow-xl shadow-black p-4">
          <h3 className="text-lg font-medium text-white dark:text-white">Total Donations</h3>
          <p className="text-2xl font-bold text-[#B6F500]">₦{data.totalAmount}</p>
        </div>
        <div className="bg-[#1D24CA] dark:bg-[#1D24CA]  rounded-2xl shadow-xl shadow-black p-4">
          <h3 className="text-lg font-medium text-white dark:text-white">Total Donors</h3>
          <p className="text-2xl font-bold text-[#B6F500]">{data.totalDonors}</p>
        </div>
        <div className="bg-[#1D24CA] dark:bg-[#1D24CA]  rounded-2xl shadow-xl shadow-black p-4">
          <h3 className="text-lg font-medium text-white dark:text-white">Recent Donations</h3>
          <p className="text-2xl font-bold text-[#B6F500]">{data.recent.length}</p>
        </div>
      </div>

      <div className="bg-[#1D24CA] dark:bg-[#1D24CA] rounded-2xl shadow-xl shadow-black p-4">
        <h3 className="text-xl font-semibold mb-3 text-white">Latest Donations</h3>
        {Array.isArray(data.recent) && data.recent.length === 0 ? (
          <p className="text-gray-500">No recent donations yet.</p>
        ) : (
          <ul className="space-y-2">
            {data.recent.map((item, index) => (
              <li
                key={index}
                className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2"
              >
                <span className=" text-[#B6F500] dark:text-white">
                  {item.name}
                </span>
                <span className="text-[#B6F500]">₦{item.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
