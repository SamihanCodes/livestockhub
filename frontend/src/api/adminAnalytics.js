import api from "./axios";

// KPIs
export const getAdminDashboardStats = () =>
  api.get("/admin/analytics/stats");

// Line charts
export const getTransactionsChart = () =>
  api.get("/admin/analytics/transactions-chart");

export const getRevenueChart = () =>
  api.get("/admin/analytics/revenue-chart");

// NEW: Latest listings table
export const getLatestListings = () =>
  api.get("/admin/analytics/latest-listings");

// NEW: Top performing listings
export const getTopListings = () =>
  api.get("/admin/analytics/top-listings");
