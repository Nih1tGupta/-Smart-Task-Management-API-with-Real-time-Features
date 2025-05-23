import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apipaths';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import { useRef } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const socket = io("http://localhost:8000"); // use address of the server

const Chat = () => {
  const { user: me } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const bottomRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const msg = { from: me._id, to: selectedUser._id, text: input };
    socket.emit("send_message", msg);
    // setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  const selectUser = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    setSelectedUser(me);
    const getAllUsers = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
        if (response.data?.length > 0) {
          setAllUsers(response.data);
        }
      } catch (error) {
        console.error("Error Fetching users:", error);
      }
    };
    getAllUsers();
  }, [me]);

  useEffect(() => {
    // Load initial messages from backend
    const fetchMessages = async () => {
      const res = await axiosInstance.get(API_PATHS.MESSAGES.GET_MESSAGES(selectedUser?._id));
      setMessages(res.data);
    };
    fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      if (
        (msg.from === selectedUser?._id && msg.to === me?._id) ||
        (msg.from === me?._id && msg.to === selectedUser?._id)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    return () => socket.off("receive_message");
  }, [selectedUser, me]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <DashboardLayout activeMenu="Live Chat">
      <div className="flex h-full">
        {/* Chat Area */}
        <div className="flex-1 flex h-[90vh] flex-col p-4 pl-0">
          <h2 className="text-xl font-semibold mb-2 pb-2">
            Chat with {selectedUser?.name}
          </h2>
          <div className="flex-1 overflow-y-auto bg-white rounded p-4 shadow">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.from === me._id ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${msg.from === me?._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              className="form-input mr-4 shadow-md"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:cursor-pointer shadow-md" 
              
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>

        {/* User List */}
        <div className="w-64 bg-white p-4 shadow">
          <h3 className="text-lg font-semibold mb-4">Users</h3>
          <ul>
            {allUsers.map((user) => (
              <li
                key={user?._id}
                className={`p-2 rounded cursor-pointer ${user?._id === selectedUser?._id
                    ? "bg-blue-100 font-bold"
                    : "hover:bg-gray-100"
                  }`}
                onClick={() => selectUser(user)}
              >
                {user?.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Chat;