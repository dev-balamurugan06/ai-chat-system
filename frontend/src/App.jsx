import { useState } from "react";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [showSignup, setShowSignup] = useState(false);

  if (!user) {
    return showSignup ? (
      <Signup onSignup={() => setShowSignup(false)} />
    ) : (
      <Login
        onLogin={() => setUser(true)}
        onSwitchSignup={() => setShowSignup(true)}
      />
    );
  }

  return <ChatPage />;
}

export default App;
