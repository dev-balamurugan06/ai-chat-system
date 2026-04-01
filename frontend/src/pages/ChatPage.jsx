import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const STORAGE_KEY = "ai_chat_chats";

export default function ChatPage() {
  const loadChats = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);

    return [
      {
        id: Date.now(),
        title: "New Chat",
        messages: [],
        pinned: false,
        archived: false
      }
    ];
  };

  const [chats, setChats] = useState(loadChats);
  const [activeChatId, setActiveChatId] = useState(loadChats()[0].id);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  const activeChat = chats.find(c => c.id === activeChatId);

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
      pinned: false,
      archived: false
    };

    setChats([newChat, ...chats]);
    setActiveChatId(newChat.id);
    setShowArchived(false);
  };

  const updateMessages = (msgs) => {
    setChats(
      chats.map(chat => {
        if (chat.id !== activeChatId) return chat;

        let newTitle = chat.title;

        if (
          chat.title === "New Chat" &&
          msgs.length > 0 &&
          msgs[0].sender === "user"
        ) {
          newTitle = msgs[0].text
            .split(" ")
            .slice(0, 4)
            .join(" ");
        }

        return {
          ...chat,
          messages: msgs,
          title: newTitle
        };
      })
    );
  };

  const renameChat = (id) => {
    const name = prompt("Enter new chat name:");
    if (!name) return;

    setChats(
      chats.map(chat =>
        chat.id === id ? { ...chat, title: name } : chat
      )
    );
  };

  const deleteChat = (id) => {
    const filtered = chats.filter(chat => chat.id !== id);

    if (filtered.length === 0) return;

    setChats(filtered);
    setActiveChatId(filtered[0].id);
  };

  const togglePinChat = (id) => {
    setChats(
      chats.map(chat =>
        chat.id === id
          ? { ...chat, pinned: !chat.pinned }
          : chat
      )
    );
  };

  const toggleArchiveChat = (id) => {
    setChats(
      chats.map(chat =>
        chat.id === id
          ? { ...chat, archived: !chat.archived }
          : chat
      )
    );

    setShowArchived(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={createNewChat}
        onSelectChat={setActiveChatId}
        onRename={renameChat}
        onDelete={deleteChat}
        onTogglePin={togglePinChat}
        onToggleArchive={toggleArchiveChat}
        showArchived={showArchived}
        setShowArchived={setShowArchived}
      />

      <ChatWindow
        messages={activeChat?.messages || []}
        setMessages={updateMessages}
      />
    </div>
  );
}