import React, { useState, useRef, useEffect } from "react";

export default function ChatBot({ recipes, onSelectRecipe }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("en-US");

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // Detect language (for speech recognition & TTS)
  const detectLanguage = (text) => {
    if (/[\u0C00-\u0C7F]/.test(text)) return "te-IN"; // Telugu
    if (/[\u0900-\u097F]/.test(text)) return "hi-IN"; // Hindi
    if (/[\u0B80-\u0BFF]/.test(text)) return "ta-IN"; // Tamil
    return "en-US";
  };

  // Initialize SpeechRecognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setLang(detectLanguage(transcript));
      setMessage(transcript);
    };

    recognition.onend = () => {
      setListening(false);
      setTimeout(() => handleSend(), 300);
    };

    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Start listening
  const startListening = () => {
    if (!recognitionRef.current) return alert("Voice input not supported");
    recognitionRef.current.lang = lang;
    setListening(true);
    recognitionRef.current.start();
  };

  // Speak bot response
  const speak = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    synthRef.current.speak(utterance);
  };

  // Send message & get AI response
  const handleSend = () => {
    if (!message.trim()) return;

    const results = recipes.filter((r) =>
      r.title.toLowerCase().includes(message.toLowerCase())
    );

    const botMsg = { text: message, results };
    setChat([botMsg, ...chat]); // newest on top
    speak(`I found ${results.length} recipe(s)`);
    setMessage("");
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg hover:bg-green-700 transition"
      >
        🤖
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-20 right-5 z-40 w-80 bg-gray-900 rounded-xl shadow-lg transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-96"
        }`}
      >
        {/* Input bar */}
        <div className="flex p-2 gap-2">
          <input
            type="text"
            placeholder="Ask recipes..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg outline-none text-black"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          {/* Mic button */}
          <button
            onClick={startListening}
            className={`flex items-center justify-center w-12 h-12 rounded-full text-white transition ${
              listening
                ? "bg-red-500 animate-pulse scale-110"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            🎙️
          </button>
          <button
            onClick={handleSend}
            className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-lg"
          >
            Ask
          </button>
        </div>

        {/* Results list */}
        <div className="flex-1 overflow-y-auto max-h-64 px-2 py-1">
          {chat.length === 0 && (
            <p className="text-gray-400">No results yet...</p>
          )}
          {chat.map((c, idx) => (
            <div key={idx} className="mb-2">
              {c.results.map((r) => (
                <div
                  key={r._id}
                  onClick={() => onSelectRecipe(r)}
                  className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer"
                >
                  {r.image_url && (
                    <img
                      src={r.image_url}
                      alt={r.title}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                  <span className="text-sm text-white">{r.title}</span>
                </div>
              ))}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>
    </>
  );
}
