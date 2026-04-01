import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin, onSwitchSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/auth/login", {
        email,
        password
      });

      // ✅ Save user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ LOGIN SUCCESS ALERT (NEW)
      alert("Login successful ✅");

      // ✅ Redirect to chat
      onLogin();
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome back 👋</h2>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.switch}>
          New user?{" "}
          <span onClick={onSwitchSignup} style={styles.link}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    background: "#0f0f10",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: "360px",
    background: "#1e1f23",
    padding: "32px",
    borderRadius: "14px",
    boxShadow: "0 0 40px rgba(0,0,0,0.6)"
  },
  title: {
    color: "white",
    marginBottom: "20px",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #333",
    background: "#111",
    color: "white"
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    background: "#19c37d",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer"
  },
  switch: {
    marginTop: "16px",
    color: "#aaa",
    textAlign: "center"
  },
  link: {
    color: "#19c37d",
    cursor: "pointer"
  },
  error: {
    color: "tomato",
    fontSize: "14px",
    marginBottom: "10px"
  }
};
