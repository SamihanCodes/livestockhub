import api from "./axios";

export const getProfile = () => api.get("/auth/profile");
