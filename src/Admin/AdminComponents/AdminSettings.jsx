import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Save,
  Loader2,
  UserCog,
  ShieldCheck,
  Lock,
  ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";
// import axios from "@/api/axios";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");

  const [siteName, setSiteName] = useState("");
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Security
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Logo Upload
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setSiteName("Esocs Centenary");
      setRegistrationOpen(true);
      setLoading(false);
    }, 800);

    // Example axios
    // axios.get("/api/admin/settings").then(res => ...)
  }, []);

  const handleUpdateGeneral = () => {
    setSaving(true);
    setTimeout(() => {
      toast.success("General settings saved!");
      setSaving(false);
    }, 1000);
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    toast.success("Password updated (dummy)");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSaveLogo = () => {
    if (!logoFile) {
      toast.error("Please select a logo first.");
      return;
    }

    toast.success("Logo saved (dummy)");
    // Real API example:
    /*
    const formData = new FormData();
    formData.append("logo", logoFile);
    await axios.post("/api/admin/logo", formData);
    */
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Title */}
      <div className="flex items-center gap-2 text-2xl font-bold">
        <Settings className="w-6 h-6 text-blue-600" />
        Admin Settings
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-gray-200">
        {["general", "security", "logo"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-medium capitalize ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* General Tab */}
        {activeTab === "general" && (
          <motion.div
            key="general"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-medium text-sm">
                <ShieldCheck className="w-4 h-4" />
                Site Name
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 font-medium text-sm">
                <UserCog className="w-4 h-4" />
                Registration Open
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={registrationOpen}
                  onChange={(e) => setRegistrationOpen(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-full"></div>
              </label>
            </div>

            <button
              onClick={handleUpdateGeneral}
              disabled={saving}
              className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <motion.div
            key="security"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-lg font-medium">
              <Lock className="w-5 h-5 text-red-500" />
              Change Password
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handlePasswordChange}
              className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Update Password
            </button>
          </motion.div>
        )}

        {/* Logo Tab */}
        {activeTab === "logo" && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-lg font-medium">
              <ImageIcon className="w-5 h-5 text-green-500" />
              Upload Logo
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-100"
            />

            {logoPreview && (
              <div className="rounded overflow-hidden border w-32 h-32">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="object-contain w-full h-full"
                />
              </div>
            )}

            <button
              onClick={handleSaveLogo}
              className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Save Logo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
