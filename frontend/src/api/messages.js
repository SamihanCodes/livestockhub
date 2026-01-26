import api from "./axios";

// ✅ Get messages for a listing (optionally filtered by buyer)
export const getMessagesByListing = (listingId, buyerId) => {
  let url = `/messages/listing/${listingId}`;

  if (buyerId) {
    url += `?buyerId=${buyerId}`;
  }

  return api.get(url);
};

// ✅ Seller: get buyers who chatted on a listing
export const getBuyersForListing = (listingId) => {
  return api.get(`/messages/listing/${listingId}/buyers`);
};

// ✅ Send message (buyer or seller)
export const sendMessage = (data) => {
  return api.post("/messages", data);
};
