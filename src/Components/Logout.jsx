import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./ModalLogin";
import { useAuth } from "./AuthContext";
import axios from "axios";
// import axios from "./axiosInstance"; // ✅ Update the path if needed

const Logout = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
     const logout = async () => {
  // try {
  //   await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie'); // Must be called before logout
  //   await axios.post('http://127.0.0.1:8000/api/logout'); // Laravel logout route
  //   console.log("Successfully logged out");
  // } catch (err) {
  //   console.error("Logout failed:", err.response?.data || err.message);
  // }


      // Clear user context and storage
      setUser(null);
      localStorage.removeItem("user");

      setLoading(false);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/register"); // or login page if preferred
      }, 2000);
    };

    setTimeout(() => {
      logout();
    }, 1000);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {loading && (
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 border-solid"></div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <h1 className="text-xl font-semibold text-center">
          You have been logged out
        </h1>
      </Modal>
    </div>
  );
};

export default Logout;
