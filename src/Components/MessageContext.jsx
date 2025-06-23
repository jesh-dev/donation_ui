import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000); // setting messages to automatically hide after 5s
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      {message && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg z-50 text-white ${
          message.type === "success" ? "bg-green-600" : "bg-red-600"
        }`}>
          {message.text}
        </div>
      )}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
