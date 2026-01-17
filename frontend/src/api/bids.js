import api from "./axios";

// Buyer places a bid
export const placeBid = (listing_id, amount) =>
  api.post("/bids", { listing_id, amount });

// Seller views bids
export const getMyBids = () =>
  api.get("/bids/my");
