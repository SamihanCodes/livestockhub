import api from "./axios";

// Buyer
export const createInterest = (listing_id) =>
  api.post("/interests", { listing_id });

// Seller
export const getMyInterests = () =>
  api.get("/interests/my");
