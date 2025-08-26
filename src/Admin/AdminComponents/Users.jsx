import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Pencil, Trash2, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useMessage } from "../../Components/MessageContext";


export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', phone_number: '' });
const { showMessage } = useMessage();
  const token = localStorage.getItem("token");

  const fetchUsers = (page = 1) => {
    setLoading(true);
    axios.get(`https://ecef.nhsurulere.site/api/admin/users?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        setUsers(res.data.data);
        setPagination({
          current_page: res.data.current_page,
          last_page: res.data.last_page,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();

    const interval = setInterval(() => {
      fetchUsers(pagination.current_page);
    }, 30000);

    return () => clearInterval(interval);
  }, [pagination.current_page]);

  const changePage = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      fetchUsers(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`https://ecef.nhsurulere.site/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          showMessage("User deleted successfully!", "success");
          fetchUsers(pagination.current_page);
        })
        .catch(err => console.error(err));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone_number: user.phone_number,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingUser) return;

    axios.put(`https://ecef.nhsurulere.site/api/admin/users/${editingUser.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        showMessage("User updated successfully!", "success");
        setEditingUser(null);
        fetchUsers(pagination.current_page);
      })
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) return (
    <div className="flex justify-center items-center py-10">
      <Loader2 className="animate-spin text-gray-600 dark:text-gray-300" size={36} />
    </div>
  );

  return (
    <div className="p-4 overflow-x-auto shadow-xl rounded-xl shadow-black bg-[#1D24CA]">
      <h2 className="text-2xl font-bold mb-10 text-white dark:text-white">All Users</h2>

      <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-800 text-left text-sm text-gray-600 dark:text-gray-300">
          <tr>
            {/* <th className="p-3">Name</th> */}
            <th className="p-3">Email</th>
            <th className="p-3">Tel</th>
            <th className="p-3">Province</th>
            <th className="p-3">Branch</th>
            <th className="p-3">Joined At</th>
            <th className="p-3">Verified</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-200 dark:divide-gray-700">
          {users.map(user => (
            <motion.tr
              key={user.id}
              className="hover:bg-gray-900 text-white dark:hover:bg-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* <td className="p-3 dark:text-white">{user.firstname} {user.lastname}</td> */}
              <td className="p-3 dark:text-white">{user.email}</td>
              <td className="p-3 dark:text-white">{user.phone_number}</td>
              <td className="p-3 dark:text-white">{user.province || '-'}</td>
              <td className="p-3 dark:text-white">{user.branch || '-'}</td>
              <td className="p-3 dark:text-white">{new Date(user.created_at).toLocaleDateString()}</td>
              <td className="p-3 dark:text-white">
                {user.email_verified_at ? (
                  <CheckCircle className="text-green-500" size={18} />
                ) : (
                  <XCircle className="text-red-500" size={18} />
                )}
              </td>
              <td className="p-3 text-center flex gap-3 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                  onClick={() => handleEdit(user)}
                >
                  <Pencil size={18} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-red-600 hover:text-red-800 dark:text-red-400"
                  onClick={() => handleDelete(user.id)}
                >
                  <Trash2 size={18} />
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
        <button
          onClick={() => changePage(pagination.current_page - 1)}
          disabled={pagination.current_page === 1}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={`px-3 py-1 rounded font-medium ${
              page === pagination.current_page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => changePage(pagination.current_page + 1)}
          disabled={pagination.current_page === pagination.last_page}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[90%] max-w-md shadow-lg"
          >
            <h3 className="text-lg font-bold mb-4 dark:text-white">Edit User</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              <input
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              <input
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone"
                type="tel"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-gray-200 active:scale-[1.02] active:bg-slate-600 dark:bg-gray-600 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 active:scale-[1.02] active:bg-slate-600 text-white rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
