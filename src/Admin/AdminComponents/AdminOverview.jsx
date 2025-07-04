import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useMessage } from "../../Components/MessageContext";
import { Download, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

function StatCard({ title, value }) {
  return (
    <div className="bg-[#1D24CA] dark:bg-[#1D24CA] rounded-2xl shadow-xl shadow-black p-4">
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <p className="text-2xl font-bold text-[#B6F500]">{value}</p>
    </div>
  );
}

export default function DonationOverview() {
  const { showMessage } = useMessage();
  const componentRef = useRef();

  const [data, setData] = useState({
    totalAmount: 0,
    totalDonors: 0,
    totalUsers: 0,
    totalRegularUsers: 0,
    recentActivity: 0,
    latest: [],
  });

  const [filter, setFilter] = useState("today");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`http://192.168.137.163:8000/api/admin/overview?filter=${filter}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        // const res = await axios.get(`http://127.0.0.1:8000/api/admin/overview?filter=${filter}`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     Accept: "application/json",
        //   },
        // });

        setData(res.data);
      } catch (err) {
        showMessage("Failed to load admin overview.", "error");
        console.error(err.response?.data || err.message);
      }
    };

    fetchData();
  }, [filter]);

  const exportCSV = () => {
    const headers = ["Name", "Amount", "Date"];
    const rows = data.latest.map(item => [item.name, item.amount, item.date]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "latest_donations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <motion.div
      className="p-4 md:p-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-tr from-violet-500 to-green-500 bg-clip-text text-transparent">
          Admin Donation Overview
        </h2>

        <div className="flex items-center gap-2">
          <select
            className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-sm"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm"
          >
            <Printer className="w-4 h-4" />
            Print Report
          </button>
        </div>
      </div>

      <div ref={componentRef}>
        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Donations" value={`₦${data.totalAmount}`} />
          <StatCard title="Total Donors" value={data.totalDonors} />
          <StatCard title="All Users" value={data.totalUsers} />
          <StatCard title="User Role Count" value={data.totalRegularUsers} />
        </div>

        <StatCard title="Today's Donations" value={`₦${data.recentActivity}`} />

        {/* Latest Donations */}
        <div className="bg-[#1D24CA] dark:bg-[#1D24CA] rounded-2xl shadow-xl shadow-black p-4 mt-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold text-white pb-5">Latest Donations</h3>
          </div>
          {Array.isArray(data.latest) && data.latest.length === 0 ? (
            <p className="text-gray-300">No recent donations found.</p>
          ) : (
            <div className="overflow-x-auto pb-10">
              <ul className="flex space-x-4 min-w-max">
                {data.latest.map((item, index) => (
                  <li
                    key={index}
                    className="min-w-[200px] flex flex-col bg-[#2C34D2] rounded-lg p-4 text-white shadow-md"
                  >
                    <span className="text-[#B6F500] font-medium">{item.name}</span>
                    <span className="text-[#B6F500] font-semibold">₦{item.amount}</span>
                    <span className="text-xs text-gray-300 mt-1">{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
