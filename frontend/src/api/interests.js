import api from "./axios";

export const expressInterest = (listingId) =>
  api.post("/interests", { listingId });

export const getListingInterests = (listingId) =>
  api.get(`/interests/${listingId}`);
