import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../../Components/AuthContext";
import { BiMoney } from "react-icons/bi";
import { MailOpenIcon } from "lucide-react";

export default function PaymentHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const { user } = useAuth();

  const fetchHistory = async (page = 1, perPageCount = perPage) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `https://ecef.nhsurulere.site/api/history?page=${page}&per_page=${perPageCount}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      // const response = await axios.get(
      //   `http://127.0.0.1:8000/api/history?page=${page}&per_page=${perPageCount}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       Accept: "application/json",
      //     },
      //   }
      // );

      setHistory(response.data.data);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
    } catch (err) {
      setError("Failed to fetch payment history.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchHistory(currentPage, perPage);
    } else {
      setError("You must be logged in to view payment history.");
      setLoading(false);
    }
  }, [user, currentPage, perPage]);

  const handlePageClick = (pageNum) => {
    if (pageNum !== currentPage) setCurrentPage(pageNum);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1 when perPage changes
  };

  return (
    <div className="bg-[#1D24CA] dark:bg-[#1D24CA]  p-6 rounded-lg shadow-xl shadow-black">
      <h2 className="text-2xl font-semibold mb-8 text-gray-100 dark:text-white">Payment History</h2>

      {loading && <p className="text-gray-500 animate-pulse">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && history.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400">No payment history found.</p>
      )}

      {!loading && !error && history.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2 ">Email</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Reference</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b dark:border-gray-700 hover:bg-gray-900 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-2 text-white dark:text-gray-200">₦{item.amount}</td>
                    <td className="px-4 py-2 text-white dark:text-gray-200">{item.email}</td>
                    <td className="px-4 py-2 text-white dark:text-gray-200">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-white dark:text-gray-200">
                      {item.reference}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-4 gap-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(lastPage)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageClick(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(lastPage, prev + 1))}
                disabled={currentPage === lastPage}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>

            {/* Page Size Selector */}
            <div className="mt-2 sm:mt-0">
              <label className="mr-2 text-sm text-gray-300 dark:text-gray-300">
                View:
              </label>
              <select
                value={perPage}
                onChange={handlePerPageChange}
                className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
