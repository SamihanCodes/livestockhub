import { useEffect, useState } from "react";
import { getMessagesByListing, sendMessage } from "../api/messages";
import { useAuth } from "../context/AuthContext";

const BuyerChatWindow = ({ chat }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (chat) {
      getMessagesByListing(chat.listingId, user.id).then((res) =>
        setMessages(res.data)
      );
    }
  }, [chat, user.id]);

  const handleSend = async () => {
    if (!text.trim()) return;

    await sendMessage({
      listing_id: chat.listingId,
      receiver_id: chat.sellerId,
      message: text,
    });

    setText("");
    const res = await getMessagesByListing(chat.listingId, user.id);
    setMessages(res.data);
  };

  return (
    <div className="card" style={{ height: "500px", display: "flex", flexDirection: "column" }}>
      <h3>Chat</h3>

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

export default BuyerChatWindow;
