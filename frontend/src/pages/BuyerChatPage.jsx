import { useParams } from "react-router-dom";
import Messages from "../components/Messages";

const BuyerChatPage = () => {
  const { listingId } = useParams();

  return (
    <div className="container">
      <h2>Chat with Seller</h2>

      <div className="card">
        <Messages
          listingId={listingId}
          listingStatus="active"
        />
      </div>
    </div>
  );
};

export default BuyerChatPage;
