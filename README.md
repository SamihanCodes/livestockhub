
# 🐄 LiveStockHub – Online Livestock Marketplace

LiveStockHub is a full-stack web application that enables **buyers and sellers to trade livestock online**. Sellers can list animals with images, buyers can browse, filter, bid, show interest, and communicate with sellers. The platform also includes an admin panel for monitoring and analytics.

This project is being developed using the **MERN-style architecture** (React + Node.js + Express + PostgreSQL) with cloud-based image storage.

---

## 🚀 Features Implemented

### 1. Authentication & Roles

* JWT-based authentication system.
* Three roles:

  * **Buyer**
  * **Seller**
  * **Admin**
* Secure protected routes.
* Login & Register system.

---

### 2. Seller Features

* Create livestock listings.
* Upload up to **5 images per listing** (Cloudinary).
* Edit listing details.
* Delete listing.
* Mark listing as **active/sold**.
* View all own listings.
* View buyer interests.
* View bids received.
* Seller dashboard.

---

### 3. Buyer Features

* View all active listings.
* Search & filter listings by:

  * Animal type
  * Min price
  * Max price
* Place bids on listings.
* Mark interest in listings.
* View own bids.
* View own transactions.
* Buyer dashboard.

---

### 4. Image Upload System

* Uses **Cloudinary + Multer**.
* Supports:

  * JPG / JPEG / PNG
* Images stored as URLs in database.
* Image preview before upload.
* Fullscreen image lightbox on click.
* Responsive grid image display.

---

### 5. Bidding System

* Buyers can place bids.
* Highest bid is shown on listing.
* Sellers can see all bids received.
* Buyers can see bids they placed.

---

### 6. Interest System

* Buyers can mark interest.
* Sellers can see list of interested buyers.
* Useful for initiating negotiations.

---

### 7. Transactions & Invoices

* Completed sales generate transactions.
* Buyers and sellers can view transaction history.
* Invoice page for each transaction.

---

### 8. Notifications System

* Users receive notifications for:

  * New bids
  * New interests
  * Transactions
* Red dot indicator in navbar.

---

### 9. Admin Panel

* Admin dashboard.
* View all users.
* View all listings.
* Analytics:

  * Total users
  * Total listings
  * Total bids
  * Platform stats.

---

## 🧩 Chat System (In Progress)

We are currently building a **dedicated real-time-style chat system** between buyers and sellers.

### Planned Final Chat Design

#### Buyer Chat Flow

* Buyer sees **“Chat with Seller”** button on each listing.
* Clicking it opens a **separate Buyer Chat Dashboard**.
* Buyer can:

  * See all sellers they’ve chatted with.
  * Select a seller.
  * Chat inside a dedicated chat window.
* Chat also accessible from navbar.

#### Seller Chat Flow

* Seller has **no chat inside MyListings**.
* Seller opens chat from navbar.
* Seller sees:

  * All listings.
  * Buyers who messaged per listing.
* Seller selects buyer → replies in chat window.

#### Chat Features

* One-to-one chat per listing.
* Message history stored in DB.
* Buyer ↔ Seller only.
* Role-based chat routes.

> Chat system is under active development and will be completed next phase.

---

## 🏗 Tech Stack

### Frontend

* React
* React Router
* Axios
* Context API (Auth)
* CSS (custom)

### Backend

* Node.js
* Express.js
* JWT Authentication
* PostgreSQL (Neon DB)
* Multer
* Cloudinary
* pg (node-postgres)

---

## 📂 Project Structure

### Backend

```
backend/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── app.js
└── server.js
```

### Frontend

```
frontend/
│
├── pages/
├── components/
├── api/
├── context/
├── routes/
└── App.jsx
```

---

## 🛠 Environment Variables

Create `.env` file in backend:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
PORT=5000

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

---

## 🧪 How to Run Locally

### Backend

```bash
cd backend
npm install
nodemon server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🗺 Roadmap (Next Phases)

### Phase 1 (Completed)

* Auth system
* Listings
* Image upload
* Bids
* Interests
* Transactions
* Admin panel

### Phase 2 (Ongoing)

* Proper buyer/seller chat system
* Separate chat dashboards
* Chat routing fixes
* Better UI for chat

### Phase 3 (Future)

* WebSocket real-time chat
* Payment gateway integration
* Ratings & reviews
* Seller verification
* Mobile responsiveness
* Search by location
* AI-based price suggestions

---

## 🎯 Project Goal

To build a **complete digital livestock trading platform** where:

* Farmers can sell animals easily.
* Buyers can discover and negotiate transparently.
* Admins can monitor platform health.
* All communication and transactions stay inside the system.

---

## 🧠 Learning Outcomes

This project covers:

* Full-stack architecture
* REST APIs
* JWT auth
* Role-based access control
* File uploads
* SQL joins & relations
* Real-world marketplace logic
* Debugging production-level issues

---

## 📌 Current Status

> Listing, bidding, interests, and image systems are **fully stable**.
> Chat system is **under active reconstruction and will be completed next**.


