
# 🐄 LiveStockHub

### A Full-Stack Livestock Trading Platform

LiveStockHub is a modern full-stack web application that enables secure livestock trading between buyers and sellers.
It includes bidding, chat, transactions, notifications, and an admin analytics dashboard.

---

## 🚀 Live Demo

> *(Add your deployed link here after deployment)*

```
https://your-live-url.com
```

---

# 📌 Features

## 👤 Authentication & Roles

* JWT-based authentication
* Role-based access control (Buyer / Seller / Admin)
* Admin demo login autofill option
* Secure protected routes

---

## 🐄 Seller Features

* Create livestock listings (with image upload via Cloudinary)
* Edit & delete listings
* View buyers interested in listings
* View and accept bids
* Seller chat with buyers
* Track transactions

---

## 🛒 Buyer Features

* Browse & filter listings
* Place bids
* Mark interest
* Chat with sellers
* View transactions
* Simulated payment flow

---

## 📊 Admin Dashboard

* Total users, listings, transactions, revenue stats
* Revenue & transaction charts (Recharts)
* User moderation (block/unblock)
* Listing overview

---

## 💬 Messaging System

* Real-time style chat (polling based)
* Seller ↔ Buyer conversations
* Auto-scroll and styled chat UI

---

## 🔔 Notifications

* Buyer interest notifications
* Bid notifications
* Read/unread state

---

# 🏗 Tech Stack

## Frontend

* React (Vite)
* React Router
* Axios
* Recharts
* CSS (Custom Styling + Glass UI)

## Backend

* Node.js
* Express.js
* PostgreSQL (Neon DB)
* JWT Authentication
* Multer
* Cloudinary (Image Upload)

---

# 🗂 Project Structure

```
livestockhub/
│
├── frontend/                # React Frontend
│   ├── pages/
│   ├── components/
│   ├── api/
│   └── context/
│
├── backend/                # Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
└── README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/SamihanCodes/FSD115-SamihanCodes
cd livestockhub
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start server:

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🧪 Demo Credentials

## 👑 Admin

(Autofill button available on login page)

```
Email: samihan@gmail.com
Password: 123
```

---

# 🛡 Security Features

* Password hashing (bcrypt)
* JWT authentication
* Role-based authorization
* Cloudinary secure image storage
* Protected admin routes

---

# 🗄 Database Overview

Main tables:

* users
* listings
* bids
* interests
* messages
* transactions
* notifications

Listings images are stored as `JSONB` array in PostgreSQL.

---


# 📈 Future Improvements

* Real-time chat with WebSockets
* Razorpay/Stripe payment integration
* Email notifications
* Advanced analytics
* Image optimization
* Pagination for listings
* Search indexing

---

# 👨‍💻 Developer

**Samihan Ajit Jadhav**
Computer Engineering Student
Full Stack Developer

---

# 📄 License

This project is for educational and demonstration purposes.

---

# 🌟 Final Notes

LiveStockHub demonstrates:

* Full-stack architecture
* Clean UI/UX
* Role-based access control
* Production-ready backend
* Real-world marketplace features



