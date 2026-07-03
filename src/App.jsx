import React from 'react'
import Sidebar from './Components/Sidebar'
import ChatWindow from './Components/ChatWindow'
import './App.css'
function App() {
  const [currentSessionId, setCurrentSessionId] = React.useState(null);

  useEffect(() => {
    createFirstSession();
  }, []);

  const createFirstSession = async () => {
    try {
      const response = await fetch("http://localhost:5000/chat/new", {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        setCurrentSessionId(data.sessionId);
      }
    } catch (error) {
      console.error("Error creating the first chat session:", error);
    }
  }

  return (
    <div className="app">
    <Sidebar
      currentSessionId={currentSessionId}
      setCurrentSessionId={setCurrentSessionId}
    />
    <ChatWindow currentSessionId={currentSessionId} />
    </div>
   
     
  );
}

export default App
