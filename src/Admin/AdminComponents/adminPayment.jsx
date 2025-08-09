import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPayments = async (page = 1, perPage = 10) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/history?page=${page}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setPayments(response.data.data);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to fetch payments...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(currentPage, perPage);
  }, [currentPage, perPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-[#1D24CA] dark:bg-gray-800 p-6 rounded-xl shadow-xl backdrop-blur-lg shadow-black">
      <h2 className="text-xl font-bold text-white dark:text-white mb-10">All Payments</h2>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="px-4 py-2">Donor</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Reference</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-200">
                  No payments found...
                </td>
              </tr>
            ) : (
              payments.map((pay, idx) => (
                <motion.tr
                  key={pay.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b dark:border-gray-700 hover:bg-gray-900 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2 text-white dark:text-gray-200">
                    {
                    pay.user

                    //  ${pay.user.lastname}`
                      ? `${pay.user.email}`
                      : "Anonymous"}
                  </td>
                  <td className="px-4 py-2 text-white dark:text-gray-200">
                    ₦{Number(pay.amount).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-blue-600 dark:text-blue-400">
                    {pay.reference}
                  </td>
                  <td className="px-4 py-2 text-gray-100 dark:text-gray-200">
                    {new Date(pay.created_at).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <label className="mr-2 text-sm text-white dark:text-gray-300"> View:</label>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:text-[#1D24CA] disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(lastPage)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === lastPage}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

