import React, { useState } from "react";
import { getMistralResponse } from "../api/huggingFaceAPI";
import { Send, Loader } from "lucide-react"; 

const Lumi: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleSendMessage = async () => {
      if (!message.trim()) return;
      setLoading(true);
  
      // Agregar mensaje del usuario
      setChat((prev) => [...prev, { sender: "user", text: message }]);
      
      // Obtener respuesta del bot
      const botResponse = (await getMistralResponse(message)) || "No se obtuvo respuesta.";
      
      // Agregar respuesta del bot
      setChat((prev) => [...prev, { sender: "bot", text: botResponse }]);
      
      setLoading(false);
      setMessage(""); // Limpia el input
    };
  
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-white">
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Lumi - Chatbot 🤖</h2>
          
          <div className="h-80 overflow-y-auto p-3 border rounded-lg bg-gray-50">
            {chat.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-3 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="flex justify-center mt-2"><Loader className="animate-spin text-blue-500" /></div>}
          </div>
  
          <div className="mt-4 flex items-center border rounded-lg p-2 shadow-sm">
            <input
              type="text"
              className="flex-1 p-2 outline-none"
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button onClick={handleSendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

export default Lumi;
