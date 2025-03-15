"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { useAuth } from "@/auth/AuthProvider";

const Chatbot = () => {
  const { supabase, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [userSkipped, setUserSkipped] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchEmail = async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select("email")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching email:", error.message);
          return;
        }

        if (data) {
          setEmail(data.email);
        }
      };
      fetchEmail();
    }
  }, [user, supabase]);


  const toggleChat = () => {
    if (!isOpen) {
      if (user) {
        setMessages([{ text: "Welcome to LogikxMind! How can I assist you today?", isBot: true }]);
      } else {
        setMessages([
          { text: "Welcome to LogikxMind!", isBot: true },
          { text: "Please sign in to continue or type 'skip' to chat anonymously.", isBot: true }
        ]);
      }
    }
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setInput("");

    // If the user has not signed in and types 'skip', allow chatting without email
    if (!user && userMessage.toLowerCase() === "skip") {
      setUserSkipped(true);
      setMessages((prev) => [...prev, { text: "Okay, proceeding without sign-in. How can I assist you?", isBot: true }]);
      return;
    }

    // If the user is not signed in and hasn't skipped, don't send messages to API
    if (!user && !userSkipped) {
      setMessages((prev) => [...prev, { text: "Please sign in or type 'skip' to continue.", isBot: true }]);
      return;
    }

    setIsThinking(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user ? email : null, message: userMessage }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.response.response || "I couldn't understand your request.", isBot: true }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Sorry, something went wrong.", isBot: true }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <>
      <button onClick={toggleChat} className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300">
        <MessageCircle size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-0 right-0 w-full md:w-96 h-[500px] bg-white rounded-t-lg md:rounded-lg shadow-xl flex flex-col z-20">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat Assistant</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[75%] p-3 rounded-lg ${message.isBot ? "bg-gray-100 text-gray-800" : "bg-blue-600 text-white"}`}>
                  {message.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={!user && !userSkipped ? "Sign in or type 'skip' to continue..." : "Type your message..."}
                className="flex-1 p-2 border rounded-l-lg focus:outline-none"
              />
              <button type="submit" className="bg-blue-600 text-white p-2 rounded-r-lg">
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
