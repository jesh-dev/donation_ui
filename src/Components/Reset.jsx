import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useMessage } from "./MessageContext";

export default function ResetPassword() {
  const { showMessage } = useMessage();
  const navigate = useNavigate();
const [searchParams] = useSearchParams();
const token = searchParams.get("token") || "";
const emailFromUrl = searchParams.get("email") || "";

const [email, setEmail] = useState(emailFromUrl);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    // if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/reset", {
        email,
        token,
        password,
        password_confirmation: confirmPassword,
      });

      if (response.status === 200 && response.data.success) {
        showMessage("🎉 Password reset successful!", "success");
        navigate("/");
      }
    } catch (error) {
      showMessage("Failed to reset password", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.form
        onSubmit={handleReset}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">
          Reset Password
        </h2>

        <input
          type="email"
          value={email}
          disabled
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-blue-500"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-2.5 text-blue-500"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition active:scale-[1.02]"
        >
          Reset Password
        </button>
      </motion.form>
    </div>
  );
}
