export default function Message({ msg }) {
  const isUser = msg.sender === "user";

  // 🟢 AI THINKING DOTS
  if (msg.thinking) {
    return (
      <div style={{ display: "flex", justifyContent: "flex-start", margin: "10px 0" }}>
        <div
          style={{
            background: "#202123",
            padding: "10px 14px",
            borderRadius: "14px",
            display: "flex",
            gap: "6px"
          }}
        >
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        margin: "10px 0"
      }}
    >
      <div
        style={{
          background: isUser ? "#1e90ff" : "#444654",
          color: "white",
          padding: "10px 14px",
          borderRadius: "14px",
          maxWidth: "70%",
          fontSize: "15px",
          lineHeight: "1.5"
        }}
      >
        {msg.text}
      </div>
    </div>
  );
}
