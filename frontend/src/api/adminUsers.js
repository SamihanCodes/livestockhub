import api from "./axios";

export const getAllUsers = () => api.get("/admin/users");

export const blockUser = (userId) =>
  api.patch(`/admin/users/${userId}/block`);

export const unblockUser = (userId) =>
  api.patch(`/admin/users/${userId}/unblock`);
