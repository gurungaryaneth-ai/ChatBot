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
    setLoading(true);
    try{
      const Response = await fetch("  http://localhost:5000/api",{
      method : "POST",
      headers : {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        Message:input
      }),

    }),
    const data = await Response.json();
    const aiMessage = {text:data,reply,sender:"AI"};
    setMessages((previousMessages)=> [...previousMessages,
      aiMessage]);
    } catch(error){
      setMessages((previousMessages)=> [
        ...previousMessages,
        {text:"Something  went wrong",
          sender:"AI"}
      ]);
    }
    setLoading(false);
  };


  return (
    <div> 
      <div>
        {messages.map((msg, index) => (
          <Message
            key={index}
            text={msg.text}
            sender={msg.sender}
          />
        ))}
        {loading && <div>Loading...</div>}
        </div>
        
    
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
  </div>
  )
};

export default ChatWindow;