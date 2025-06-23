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
  const {showMessage} = useMessage();
  const [isSignIn, setIsSignIn] = useState(true);
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
  const [errors, setErrors] = useState({});
  const [showVerification, setShowVerification] = useState(false);
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    /// setErrors({ ...errors, [e.target.name]: "" });
  };

 
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname.trim())
      newErrors.firstname = "Firstname is required";
    // if (!formData.code.trim()) newErrors.code = "code is required";
    if (!formData.lastname.trim()) newErrors.lastname = "lastname is required";
    if (!formData.email.trim()) newErrors.email = "Valid email is required";
    if (!formData.phone_number.trim())
      newErrors.phone_number = "Phone Number is required";
    if (!formData.province.trim()) newErrors.province = "province is required";
    if (!formData.branch.trim()) newErrors.branch = "branch is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", { withCredentials: true });
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone_number.trim(),
        password: formData.password.trim(),
        province: formData.province,
        branch: formData.branch,
      });

      // Debug: see what you get from backend
      console.log("Registration response:", response);

      // Success case — accept 200 or 201 and check for a message
      if (response.status === 200 && response.data.success) {
        showMessage(response.data.message, "success");
        setShowVerification(true);
        // console.log(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      // console.error("Registration error:", error);
      // const message =
      //   error?.response?.data?.message ||
      //   error.message ||
      //   "Something went wrong.";

      showMessage(message, "error");
    }

    //  {

    // }
  };
  
  const {setUser} = useAuth();
  const validateLoginForm = () => {
  const newErrors = {};
  if (!formData.email.trim()) newErrors.email = "Email is required";
  if (!formData.password.trim()) newErrors.password = "Password is required";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateLoginForm()) {
      return;
    }
    try {
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", { withCredentials: true });
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: formData.email.trim(),
        password: formData.password.trim(),
      });
      const verified = response.data.user.email_verified_at;
      if (verified === null) {
        showMessage("Please verify your email", "error");
        // console.log("Verification status:", response.data.user.email_verified_at);
      } else {
        if (response.status === 200 && response.data.success) {
          setUser(response.data.user);
          showMessage(response.data.message);
          // console.log(response);
          if (response.data.user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        }
      }
    } catch (error) {
      // console.error("Registration error:", error);
      // const message =
      //   error.response ||
      //   error.message ||
      //   "Something went wrong.";

      showMessage(error.response.data.message, "error");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", { withCredentials: true });
      const response = await axios.post("http://127.0.0.1:8000/api/verify", {
        email: formData.email.trim(),
        code: code,
      });

      console.log("✅ Verification Response:", response);

      if (response.status === 201) {
        // setMessage(response.data.message);
        setShowVerification(false);
        setIsSignIn(true);
        showMessage("🎉 Verified!", "success");
      } else {
        // console.error("⚠️ Unexpected status:", response);
        showMessage(response.data.user.email_verified_at, "error");
      }
    } catch (error) {
      // console.error("Verification error:", error);
      // const message =
      //   error?.response?.data?.message ||
      //   error.message ||
      //   "Something went wrong.";

      showMessage(message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8  dark:bg-gray-900 px-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md relative">
          <div className="flex justify-between mb-6">
            <button
              onClick={() => setIsSignIn(true)}
              className={`text-sm font-medium px-4 py-2 rounded transition duration-300 ${
                isSignIn
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`text-sm font-medium px-4 py-2 rounded transition duration-300 ${
                !isSignIn
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Sign Up
            </button>
          </div>
          <AnimatePresence mode="wait">
            {isSignIn ? (
              // // Sign In Form
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
              <div>
                 <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                <button onClick={() => setShowPassword(!showPassword)}
                  className="absolute transition-all duration-300 delay-300 right-12 pt-3 text-blue-500  bottom-21 hover:scale-[1.05] hover:text-blue-800"
                  >{showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ): (
                  <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}

                <button
                  type="submit"
                  className="w-full active:scale-[1.05] active:bg-slate-500 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Sign In
                </button>
              </motion.form>
            ) : (
              //  // Sign Up Form
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
                  name="firstname"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">{errors.firstname}</p>
                )}

                <input
                  name="lastname"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm">{errors.lastname}</p>
                )}

                <input
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

                <input
                  name="phone_number"
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors.phone_number && (
                  <p className="text-red-500 text-sm">{errors.phone_number}</p>
                )}

                {/* <input name="province" type="text" placeholder="First Name"   " /> */}
                <select
                  value={formData.province}
                  onChange={handleChange}
                  name="province"
                  id="province"
                  className="w-full px-4 py-2 text-gray-400 border rounded dark:bg-gray-700 dark:text-white"
                >
                  <option
                    value=""
                    className="dark:bg-gray-700 text-gray-700 dark:text-white"
                  >
                    select province--
                  </option>
                  <option value="mainland">Mainland</option>
                  <option value="lagos">Lagos</option>
                </select>
                {errors.province && (
                  <p className="text-red-500 text-sm">{errors.province}</p>
                )}

                <select
                  value={formData.branch}
                  onChange={handleChange}
                  name="branch"
                  id="branch"
                  className="w-full px-4 py-2 text-gray-400 border rounded dark:bg-gray-700 dark:text-white"
                >
                  <option
                    value=""
                    className="dark:bg-gray-700 text-gray-700 dark:text-white"
                  >
                    select branch--
                  </option>
                  <option value="branch_1">Mainland Branch</option>
                  <option value="branch_2">Lagos Branch</option>
                </select>
                {errors.branch && (
                  <p className="text-red-500 text-sm">{errors.branch}</p>
                )}

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                   <button onClick={() => setShowPassword(!showPassword)}
                  className="absolute transition-all duration-300 delay-300 right-12 pt-3 text-blue-500  bottom-21 hover:scale-[1.05] hover:text-blue-800"
                  >{showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ): (
                  <Eye className="h-5 w-5" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}

                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                /><button onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute transition-all duration-300 delay-300 right-12 pt-3 text-blue-500  bottom-21 hover:scale-[1.05] hover:text-blue-800"
                  >{showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ): (
                  <Eye className="h-5 w-5" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full active:scale-[] bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Sign Up
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
                className="absolute  inset-0 bg-transparent bg-opacity-60 flex backdrop-blur-sm items-center justify-center"
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
                    // onChange={handleChange}
                    value={formData.code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-4 py-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={handleVerify}
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    Verify Account
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
