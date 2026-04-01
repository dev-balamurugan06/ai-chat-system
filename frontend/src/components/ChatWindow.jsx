import { useEffect, useRef, useState } from "react";
import { sendMessage } from "../services/api";
import Message from "./Message";

export default function ChatWindow({ messages, setMessages }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // 🔹 Typing animation
  const typeReply = async (text, baseMessages) => {
    let current = "";
    for (let char of text) {
      current += char;
      setMessages([
        ...baseMessages,
        { sender: "bot", text: current }
      ]);
      await new Promise(res => setTimeout(res, 18));
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { sender: "user", text: input };
    const baseMessages = [...messages, userMsg];

    setMessages(baseMessages);
    setInput("");
    setLoading(true);

    // ⏳ AI thinking dots
    setMessages([
      ...baseMessages,
      { sender: "bot", text: "● ● ●", thinking: true }
    ]);

    try {
      const res = await sendMessage(input);
      // ✅ FIX IS HERE
      await typeReply(res.reply, baseMessages);
    } catch (e) {
      setMessages([
        ...baseMessages,
        { sender: "bot", text: "⚠️ Server error" }
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#111114" }}>
      
      {/* Messages */}
      <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
        {messages.map((m, i) => (
          <Message key={i} msg={m} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* ChatGPT-style input */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #292a30",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            background: "#24262a",
            borderRadius: "12px",
            padding: "10px 12px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 0 0 1px #282a30 inset"
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Send a message..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#ececf1",
              fontSize: "15px"
            }}
          />

          <button
            onClick={handleSend}
            disabled={loading}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: loading ? "#010101" : "#10a37f",
              color: "white",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
