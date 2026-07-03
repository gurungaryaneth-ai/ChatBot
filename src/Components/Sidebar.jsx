import { useEffect, useState } from "react";

function Sidebar({ setCurrentSessionId }) {
  const [chats, setChats] = useState([]);
i
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await fetch("http://localhost:5000/chat/sessions");
      const data = await response.json();

      console.log("Fetched chats:", data);

      if (data.success) {
        setChats(data.chats);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const createNewChat = async () => {
    try {
      const response = await fetch("http://localhost:5000/chat/new", {
        method: "POST",
      });

      const data = await response.json();

      console.log("New chat created:", data);

      if (data.success) {
        setCurrentSessionId(data.sessionId);
        fetchChats(); // Refresh sidebar
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <div className="sidebar">
      <h1>CHAT BOT</h1>

      <button onClick={createNewChat}>+ New Chat</button>

      <h3>Previous Chats</h3>

      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => setCurrentSessionId(chat._id)}
          style={{
            cursor: "pointer",
            padding: "10px",
            borderBottom: "1px solid #ccc",
          }}
        >
          {chat.title}
        </div>
      ))}

      <hr />

      <div>HOME</div>
      <div>STARRED</div>
      <div>HELP</div>
    </div>
  );
}

export default Sidebar;