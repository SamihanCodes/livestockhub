import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreateListing from "./pages/CreateListing";
import MyListings from "./pages/MyListings";
import Listings from "./pages/Listings";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import MyBids from "./pages/MyBids";
import MyTransactions from "./pages/MyTransactions";
import Invoice from "./pages/Invoice";
import MyInterests from "./pages/MyInterests";
import AdminDashboard from "./pages/AdminDashboard";
import Notifications from "./pages/Notifications";
import EditListing from "./pages/EditListing";

// Chat pages
import SellerChats from "./pages/SellerChats";
import BuyerChatPage from "./pages/BuyerChatPage";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Listings */}
        <Route path="/listings" element={<Listings />} />

        <Route
          path="/listings/create"
          element={
            <ProtectedRoute>
              <CreateListing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/listings/my"
          element={
            <ProtectedRoute>
              <MyListings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/listings/edit/:id"
          element={
            <ProtectedRoute>
              <EditListing />
            </ProtectedRoute>
          }
        />

        {/* Interests / Bids */}
        <Route
          path="/interests/my"
          element={
            <ProtectedRoute>
              <MyInterests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bids/my"
          element={
            <ProtectedRoute>
              <MyBids />
            </ProtectedRoute>
          }
        />

        {/* Transactions */}
        <Route
          path="/transactions/my"
          element={
            <ProtectedRoute>
              <MyTransactions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/invoice/:id"
          element={
            <ProtectedRoute>
              <Invoice />
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* Chats */}
        <Route
          path="/buyer/chats/:listingId"
          element={
            <ProtectedRoute>
              <BuyerChatPage />
            </ProtectedRoute>
          }
        />


        <Route
          path="/seller/chats"
          element={
            <ProtectedRoute>
              <SellerChats />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
