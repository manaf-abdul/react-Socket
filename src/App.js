import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import io from "socket.io-client";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:8080");
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
      setSocket(null);
    });

    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit("message", input);
      setInput("");
    }
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
