import api from "./axios";

export const getAllListings = () => api.get("/listings");

export const getMyListings = () => api.get("/listings/my");

export const createListing = (data) => api.post("/listings", data);

export const updateListing = (id, data) =>
  api.put(`/listings/${id}`, data);
