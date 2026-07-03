import Message from "./Message";
import { useState, useEffect } from "react";

function ChatWindow({currentSessionId}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch previous chats
  const getChats = async () => {
    try {
      const response = await fetch(`http://localhost:5000/chats/${currentSessionId}`);
      const data = await response.json();

      if (data.success) {
        setMessages(data.chats);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    if (currentSessionId) {
    getChats();
    } else {
      setMessages([]); // Clear messages if no session is selected
    }
  }, [currentSessionId]);

  // Send a new message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    // Display user's message immediately
    setMessages((prev) => [
      ...prev,
      { text: userMessage, sender: "user" },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: currentSessionId, // Include the session ID
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Adjust this according to your backend response
      const aiMessage = {
        text: data.reply || data.message || "No response from AI",
        sender: "AI",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          text: "Something went wrong.",
          sender: "AI",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>CHAT KHUL JA SIM SIM</h2>
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <Message
            key={index}
            text={msg.text}
            sender={msg.sender}
          />
        ))}

        {loading && <div>Loading...</div>}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;