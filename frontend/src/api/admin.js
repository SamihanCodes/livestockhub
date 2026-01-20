import api from "./axios";

export const getUsers = () => api.get("/admin/users");
export const getListings = () => api.get("/admin/listings");
export const getTransactions = () => api.get("/admin/transactions");
