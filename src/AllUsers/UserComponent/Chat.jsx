// import { useEffect, useState } from "react";
// import { Loader2 } from "lucide-react";
// import axios from '../../Components/axiosInstance'; // Adjust the import path as necessary
// import { useAuth } from "../../Components/AuthContext"; // Adjust the import path as necessary
// export default function UserChat() {
//   const { token } = useAuth(); // ✅ this makes token available
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [sending, setSending] = useState(false);

//   const fetchMessages = () => {
//     axios.get("http://127.0.0.1:8000/chat/messages", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//       },
//     })
//       .then((res) => setMessages(res.data))
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 4000); // auto refresh
//     return () => clearInterval(interval);
//   }, []);

//   const sendMessage = () => {
//     if (!input.trim()) return;
//     setSending(true);
//     axios.post("http://127.0.0.1:8000/chat/send",
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: "application/json",
//             },
//             data: { message: input },
//         })
//       .then(() => {
//         setInput("");
//         fetchMessages();
//       })
//       .catch(console.error)
//       .finally(() => setSending(false));
//   };

//   return (
//     <div className="p-4 bg-white rounded shadow max-w-2xl mx-auto mt-6 space-y-4">
//       <h2 className="text-lg font-bold text-gray-800">Chat with Admin</h2>

//       <div className="h-64 overflow-y-auto border rounded p-3 space-y-2 bg-gray-50">
//         {loading ? (
//           <div className="flex justify-center pt-10">
//             <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
//           </div>
//         ) : messages.length === 0 ? (
//           <p className="text-center text-gray-500">No messages yet.</p>
//         ) : (
//           messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`max-w-xs px-4 py-2 rounded-lg ${
//                 msg.sender_id === msg.receiver_id
//                   ? "text-center text-gray-400"
//                   : msg.sender_id === 1
//                   ? "bg-gray-300 text-left text-sm"
//                   : "bg-blue-500 text-white self-end text-sm ml-auto"
//               }`}
//             >
//               {msg.message}
//             </div>
//           ))
//         )}
//       </div>

//       <div className="flex items-center gap-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={sendMessage}
//           disabled={sending}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {sending ? "Sending..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// }
