import api from "./axios";

export const getAdminSummary = () =>
  api.get("/admin/summary");
