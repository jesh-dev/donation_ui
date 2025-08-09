// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../../Components/AuthContext";
// import { motion } from "framer-motion";
// import {
//   BadgeCheck,
//   AlertTriangle,
//   LoaderCircle,
// } from "lucide-react";
// import { useMessage } from "../../Components/MessageContext";

// export default function PledgeTabs() {
//   const { token } = useAuth();
//   const [tab, setTab] = useState("pledge");
//   const [amount, setAmount] = useState("");
//   const [pledgeAmount, setPledgeAmount] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [pledge, setPledge] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { showMessage } = useMessage();

//   const fetchPledge = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/pledges/current", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setPledge(res.data.pledge);
//     } catch (err) {
//       setPledge(null);
//     }
//   };

//   useEffect(() => {
//     fetchPledge();
//   }, []);

//   useEffect(() => {
//     if (pledge && pledge.amount_paid >= pledge.amount) {
//       showMessage("You have completed your pledge.", "success");
//     }
//   }, [pledge]);

//   const makePledge = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/api/pledge",
//         {
//           amount: pledgeAmount,
//           due_date: dueDate,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       showMessage(res.data.message, "success");
//       setPledgeAmount("");
//       setDueDate("");
//       fetchPledge();
//     } catch (err) {
//       showMessage(err.response?.data?.message || "Failed to create pledge", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const payPledge = async (e) => {
//     e.preventDefault();
//     if (!pledge) return;
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         `http://127.0.0.1:8000/api/pledge/${pledge.id}/pay`,
//         { amount },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       showMessage(res.data.message, "success");
//       setAmount("");
//       fetchPledge();
//     } catch (err) {
//       showMessage(err.response?.data?.message || "Payment failed", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const payFullPledge = async () => {
//     if (!pledge) return;
//     setLoading(true);

//     try {
//       await axios.post(
//         `http://127.0.0.1:8000/api/pledge/${pledge.id}/pay`,
//         { amount: pledge.amount - pledge.amount_paid },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       showMessage("Full pledge paid successfully.", "success");
//       fetchPledge();
//     } catch (err) {
//       showMessage("Full payment failed.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const pledgeCompleted = pledge && pledge.amount_paid >= pledge.amount;
//   const canMakeNewPledge = !pledge || pledgeCompleted;

//   return (
//     <motion.div
//       className="p-4 max-w-2xl mx-auto"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="flex justify-center gap-3 mb-6">
//         <button
//           onClick={() => {
//             if (!canMakeNewPledge) {
//               showMessage("You already have an active pledge", "error");
//             } else {
//               setTab("pledge");
//             }
//           }}
//           className={`relative px-4 py-2 rounded-md text-sm md:text-base ${
//             tab === "pledge"
//               ? "bg-green-600 text-white"
//               : "bg-gray-100 hover:bg-gray-200"
//           }`}
//         >
//           Make Pledge
//           {pledge && !pledgeCompleted && (
//             <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-600 rounded-full"></span>
//           )}
//         </button>
//         <button
//           onClick={() => setTab("pay")}
//           className={`px-4 py-2 rounded-md text-sm md:text-base ${
//             tab === "pay"
//               ? "bg-green-600 text-white"
//               : "bg-gray-100 hover:bg-gray-200"
//           }`}
//         >
//           Pay Pledge
//         </button>
//       </div>

//       {tab === "pledge" && canMakeNewPledge && (
//         <motion.form
//           onSubmit={makePledge}
//           className="space-y-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <input
//             type="number"
//             placeholder="Enter pledge amount"
//             value={pledgeAmount}
//             onChange={(e) => setPledgeAmount(e.target.value)}
//             className="w-full border px-4 py-2 rounded-md"
//             required
//           />
//           <input
//             type="date"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//             className="w-full border px-4 py-2 rounded-md"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
//             disabled={loading}
//           >
//             {loading ? <LoaderCircle className="animate-spin w-4 h-4 mx-auto" /> : "Create Pledge"}
//           </button>
//         </motion.form>
//       )}

//       {tab === "pay" && pledge && !pledgeCompleted ? (
//         <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//           <div className="bg-gray-50 p-4 rounded-md shadow">
//             <p><strong>Amount:</strong> ₦{pledge.amount}</p>
//             <p><strong>Paid:</strong> ₦{pledge.amount_paid}</p>
//             <p><strong>Remaining:</strong> ₦{pledge.amount - pledge.amount_paid}</p>
//           </div>

//           {pledge.amount_paid === 0 && (
//             <button
//               onClick={payFullPledge}
//               className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
//               disabled={loading}
//             >
//               {loading ? <LoaderCircle className="animate-spin w-4 h-4 mx-auto" /> : "Pay Full Pledge"}
//             </button>
//           )}

//           <form onSubmit={payPledge} className="space-y-4">
//             <input
//               type="number"
//               placeholder="Enter part amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="w-full border px-4 py-2 rounded-md"
//                required
//               max={pledge.amount - pledge.amount_paid}
//             />
//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
//               disabled={loading}
//             >
//               {loading ? <LoaderCircle className="animate-spin w-4 h-4 mx-auto" /> : "Pay Now"}
//             </button>
//           </form>
//         </motion.div>
//       ) : tab === "pay" && (
//         <p className="text-gray-500">No active pledge found.</p>
//       )}
//     </motion.div>
//   );
// }
