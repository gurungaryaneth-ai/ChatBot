import Message from "./Message";
import { useState } from "react";

function ChatWindow() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    setInput("");

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "This is a demo bot reply!", 
        sender: "bot" 
      }]);
    }, 500);
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
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;