import { useEffect, useState } from "react";
import { getMessagesByListing, sendMessage } from "../api/messages";
import { useAuth } from "../context/AuthContext";

const SellerChatWindow = ({ chat }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const loadMessages = async () => {
    const res = await getMessagesByListing(
      chat.listingId,
      chat.buyerId
    );
    setMessages(res.data);
  };

  useEffect(() => {
    loadMessages();
  }, [chat]);

  const handleSend = async () => {
    if (!text.trim()) return;

    await sendMessage({
      listing_id: chat.listingId,
      receiver_id: chat.buyerId,
      message: text,
    });

    setText("");
    loadMessages();
  };

  return (
    <div className="card" style={{ height: "500px", display: "flex", flexDirection: "column" }}>
      <h3>Chat with {chat.buyerEmail}</h3>

      <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              textAlign: m.sender_id === user.id ? "right" : "left",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "6px 10px",
                borderRadius: "10px",
                background:
                  m.sender_id === user.id ? "#DCFCE7" : "#E0F2FE",
              }}
            >
              {m.message}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default SellerChatWindow;
