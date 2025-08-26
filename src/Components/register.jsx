import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useMessage } from "./MessageContext";

export default function AuthPage() {
  const { showMessage } = useMessage();
  const [authMode, setAuthMode] = useState("signIn");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    province: "",
    branch: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [showVerification, setShowVerification] = useState(false);
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser, setToken } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const emailLock = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneLock = /^((\+234)[789][01]\d{8}|0[789][01]\d{8})$/;
  const passwordLock = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  // const passwordLock = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = "Firstname is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Lastname is required";
    if (!formData.email.trim() || !emailLock.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.phone_number.trim() || !phoneLock.test(formData.phone_number)) newErrors.phone_number = "Phone Number is required";
    if (!formData.province.trim()) newErrors.province = "Province is required";
    if (!formData.branch.trim()) newErrors.branch = "Branch is required";
    if (!formData.password.trim() || !passwordLock.test(formData.password)) newErrors.password = "Password must be at least 8+ characters, contain at least 1 uppercase, lower, number and 1 special character";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLoginForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateLoginForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post("https://ecef.nhsurulere.site/api/login", {
        email: formData.email.trim(),
        password: formData.password.trim(),
      }, {
        headers: {
          Accept: "application/json",
        },
      });

      const verified = response.data.user.email_verified_at;
      if (!verified) {
        showMessage("Please verify your email", "error");
      } else if (response.data.success) {
        setUser(response.data.user);
        setToken(response.data.token);
        showMessage(response.data.message);
        navigate(response.data.user.role === "admin" ? "/admin" : "/dashboard");
      }
    } catch (error) {
      showMessage("Login failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post("https://ecef.nhsurulere.site/api/register", {
        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone_number.trim(),
        password: formData.password.trim(),
        province: formData.province,
        branch: formData.branch,
      });

      if (response.status === 200 && response.data.success) {
        showMessage(response.data.message, "success");
        setShowVerification(true);
      }
    } catch (error) {
      showMessage(error.response?.data?.message || "Registration failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("https://ecef.nhsurulere.site/api/verify", {
        email: formData.email.trim(),
        code: code,
      });

      if (response.status === 201) {
        setShowVerification(false);
        setAuthMode("signIn");
        showMessage("🎉 Verified!", "success");
      } else {
        showMessage("Verification failed", "error");
      }
    } catch (error) {
      showMessage("Verification failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      showMessage("Email is required", "error");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("https://ecef.nhsurulere.site/api/forgot", {
        email: forgotEmail.trim(),
      });
      if (response.data.status === 200 && response.data.success) {
        showMessage("📩 Reset link sent to your email", "success");
        setAuthMode("signIn");
      }
    } catch (err) {
      showMessage("Failed to send reset link", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-200  flex items-center justify-center p-8 dark:bg-black/90 px-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl shadow-black/30 w-full max-w-md relative">
          <div className="flex justify-between mb-6">
            <button
              onClick={() => setAuthMode("signIn")}
              className={`text-sm font-medium px-4 py-2 rounded transition duration-300 ${
                authMode === "signIn"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode("signUp")}
              className={`text-sm font-medium px-4 py-2 rounded transition duration-300 ${
                authMode === "signUp"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Sign Up
            </button>
          </div>


          {/* signIn Form */}
          <AnimatePresence mode="wait">
            {authMode === "signIn" && (
              <motion.form
                key="sign-in"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSignIn}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
                  Welcome Back
                </h2>
                <input
                  required
                  a="true"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
                <div className="relative">
                <input
                  required
                  a="true"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
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
                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <p>Remember me</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAuthMode("forgot")}
                    className="underline hover:text-blue-500"
                  >
                    Forgot Password?
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 active:scale-[1.05] active:bg-slate-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </motion.form>
            )}

            


            {authMode === "signUp" && (
              
              // Sign Up Form
              <motion.form
                key="sign-up"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSignUp}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
                  Create an Account
                </h2>
                <input
                required
                  a="true"
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">{errors.firstname}</p>
                )}
                <input
                required
                  a="true"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm">{errors.lastname}</p>
                )}
                <input
                required
                  a="true"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
                <input
                required
                  a="true"
                  name="phone_number"
                  placeholder="Phone"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors.phone_number && (
                  <p className="text-red-500 text-sm">{errors.phone_number}</p>
                )}
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-gray-400 border rounded dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Province</option>
                  <option value="mainland">Mainland</option>
                  <option value="lagos">Lagos</option>
                </select>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-gray-400 border rounded dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Branch</option>
                  <option value="branch_1">Mainland Branch</option>
                  <option value="branch_2">Lagos Branch</option>
                </select>
                <div className="relative">

                <input
                required
                a="true"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
                <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-blue-500"
            >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
            </div>
                <div className="relative">

                <input
                required
                a="true"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
                <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-2.5 text-blue-500"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white active:scale-[1.05] active:bg-slate-600 py-2 rounded hover:bg-blue-700 transition"
                >
                  {isLoading ? "Signing Up..." : "Sign Up"}
                </button>
              </motion.form>
            )}



            {authMode === "forgot" && (
              // Forgot Password Form
              <motion.form
                key="forgot"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleForgotPassword}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
                  Forgot Password
                </h2>
                <input
                required
                  a="true"
                  name="forgotEmail"
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 active:scale-[1.05] active:bg-slate-600 rounded hover:bg-blue-700 transition"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode("signIn")}
                  className="text-sm underline hover:text-blue-500 text-center w-full"
                >
                  Back to Sign In
                </button>
              </motion.form>
            )}
          </AnimatePresence>



          {/* Verification Modal */}
          <AnimatePresence>
            {showVerification && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-transparent bg-opacity-60 flex backdrop-blur-sm items-center justify-center"
              >
                <motion.form
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-sm"
                >
                  <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-white">
                    Enter Verification Code
                  </h3>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-4 py-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
                  />
                  {
                    errors.code && code.length < 6 && (
                    <p className="text-red-500 text-sm">{errors.code}</p>
                  )}
                  <button
                    onClick={handleVerify}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 active:scale-[1.05] active:bg-slate-600 text-white py-2 rounded  hover:bg-blue-700 transition"
                  >
                    {isLoading ? "Verifying..." : "Verify Account"}
                  </button>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
}
