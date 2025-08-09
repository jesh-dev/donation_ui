// import { useEffect, useState } from "react";
// import axios from "../../Components/axiosInstance"; // Adjust the import path as necessary
// import { useAuth } from "../../Components/AuthContext"; // Adjust the import path as necessary

// export default function AdminChat() {
//   const { token } = useAuth(); // ✅ this makes token available
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     axios.get("http://127.0.0.1:8000/chat/users").then((res) => setUsers(res.data));
//   }, []);

//   useEffect(() => {
//     if (selectedUser) {
//       fetchMessages();
//     }
//   }, [selectedUser]);

//   const fetchMessages = () => {
//     axios
//       .get(`http://127.0.0.1:8000/chat/messages?user_id=${selectedUser.id}`)
//       .then((res) => setMessages(res.data))
//       .catch((err) => console.error("Fetch messages error:", err));
//   };

//   const sendMessage = () => {
//     if (!input.trim()) return;
//     axios
//       .post("/chat/send", {
//         message: input,
//         receiver_id: selectedUser.id,
//       })
//       .then(() => {
//         setInput("");
//         fetchMessages();
//       });
//   };

//   return (
//     <div>{/* your chat UI remains the same */}</div>
//   );
// }
