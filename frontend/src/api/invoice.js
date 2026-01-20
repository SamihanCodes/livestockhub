import api from "./axios";

export const getInvoice = (id) =>
  api.get(`/transactions/${id}`);
