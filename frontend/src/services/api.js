import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

export const sendMessage = async (message) => {
  const res = await api.post("/chat", { message });
  return res.data;
};

export default api;
