import { useState } from "react";

export default function Sidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onRename,
  onDelete,
  onTogglePin,
  onToggleArchive,
  showArchived,
  setShowArchived
}) {
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const email = user?.email || "";
  const username = email.split("@")[0];
  const avatar = username.charAt(0).toUpperCase();

  const visibleChats = chats.filter(chat =>
    showArchived ? chat.archived : !chat.archived
  );

  const filtered = visibleChats.filter(chat =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  const pinnedChats = filtered.filter(chat => chat.pinned);
  const normalChats = filtered.filter(chat => !chat.pinned);

  const renderChat = (chat) => (
    <div
      key={chat.id}
      onMouseEnter={() => setHoverId(chat.id)}
      onMouseLeave={() => setHoverId(null)}
      onClick={() => onSelectChat(chat.id)}
      style={{
        padding: "8px 10px",
        marginBottom: "4px",
        background:
          chat.id === activeChatId ? "#0c0c0d" : "transparent",
        borderRadius: "6px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        position: "relative"
      }}
    >
      <span
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          fontSize: "14px"
        }}
      >
        {chat.title}
      </span>

      {hoverId === chat.id && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpenId(menuOpenId === chat.id ? null : chat.id);
          }}
          style={{ fontSize: "18px", padding: "0 6px" }}
        >
          ⋮
        </span>
      )}

      {menuOpenId === chat.id && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            right: "10px",
            top: "36px",
            background: "#111113",
            border: "1px solid #555",
            borderRadius: "8px",
            width: "160px",
            zIndex: 999
          }}
        >
          {!showArchived && (
            <div
              onClick={() => {
                onTogglePin(chat.id);
                setMenuOpenId(null);
              }}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #444"
              }}
            >
              {chat.pinned ? "Unpin" : "Pin"}
            </div>
          )}

          <div
            onClick={() => {
              onToggleArchive(chat.id);
              setMenuOpenId(null);
            }}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #444"
            }}
          >
            {showArchived ? "Unarchive" : "Archive"}
          </div>

          <div
            onClick={() => {
              onRename(chat.id);
              setMenuOpenId(null);
            }}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #444"
            }}
          >
            Rename
          </div>

          <div
            onClick={() => {
              onDelete(chat.id);
              setMenuOpenId(null);
            }}
            style={{
              padding: "10px",
              cursor: "pointer",
              color: "#ff6b6b"
            }}
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      style={{
        width: "260px",
        background: "#202123",
        padding: "10px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        height: "100vh"
      }}
    >
      {/* New Chat */}
      <button
        onClick={onNewChat}
        style={{
          width: "100%",
          padding: "10px",
          background: "#343541",
          color: "white",
          border: "1px solid #555",
          marginBottom: "8px",
          cursor: "pointer"
        }}
      >
        + New Chat
      </button>

      {/* Toggle Archive */}
      <button
        onClick={() => setShowArchived(!showArchived)}
        style={{
          width: "100%",
          padding: "8px",
          background: "transparent",
          color: "#aaa",
          border: "1px solid #444",
          marginBottom: "8px",
          cursor: "pointer"
        }}
      >
        {showArchived ? "← Back to Chats" : "View Archive"}
      </button>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search chats"
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          background: "#343541",
          border: "1px solid #555",
          color: "white",
          outline: "none",
          borderRadius: "6px"
        }}
      />

      <div style={{ flex: 1, overflowY: "auto" }}>
        {pinnedChats.length > 0 && !showArchived && (
          <>
            <div style={{ color: "#aaa", fontSize: "12px", margin: "6px 0" }}>
              PINNED
            </div>
            {pinnedChats.map(renderChat)}
          </>
        )}

        {normalChats.map(renderChat)}

        {filtered.length === 0 && (
          <div style={{ color: "#777", padding: "10px", fontSize: "13px" }}>
            No chats
          </div>
        )}
      </div>

      {/* USER PROFILE */}
      <div
        style={{
          borderTop: "1px solid #444",
          paddingTop: "12px",
          marginTop: "10px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px"
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#10a37f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              marginRight: "8px"
            }}
          >
            {avatar}
          </div>

          <div>
            <div style={{ fontSize: "14px", color: "white" }}>
              {username}
            </div>
            <div style={{ fontSize: "12px", color: "#aaa" }}>
              {email}
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}
          style={{
            width: "100%",
            padding: "8px",
            background: "#ff4d4f",
            border: "none",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}