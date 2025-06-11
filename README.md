# 🏸 Indian Association Hall - Badminton Court Booking System

A simple and user-friendly web app for customers to book 1-hour badminton court slots online, just like booking a cinema ticket.

## 📁 Project Structure

```
project/
├── backend/        # Node.js + Express + SQLite API
├── frontend/       # React (Vite) booking UI
└── README.md       # Setup & deployment guide
```

## ⚙️ Backend Setup (`backend/`)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Run the Server (Locally)
```bash
node index.js
```
Server runs on: `http://localhost:4000`

## 🌐 Frontend Setup (`frontend/`)

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Update API URL
Edit `App.jsx` and update this line:
```js
const API_BASE = 'https://YOUR-BACKEND-URL.onrender.com';
```

### 3. Run the Frontend (Locally)
```bash
npm run dev
```

## 🚀 Deployment Guide

### 🛠 Backend on Render
1. Go to https://render.com
2. Click “New +” → Web Service
3. Connect your GitHub repo and select the `backend/` folder
4. Set:
   - Environment: Node
   - Build Command: npm install
   - Start Command: node index.js
5. Deploy and get public backend URL

### 💻 Frontend on Vercel
1. Go to https://vercel.com
2. Click “New Project” and select the `frontend/` folder
3. During setup:
   - Set environment variable VITE_API_URL = https://your-backend-url.onrender.com
4. Deploy and get public frontend URL

## 📦 Booking System Rules

- ⏰ Time Slots: 2 PM to 11 PM, 1-hour fixed slots
- 🏸 Courts: 3 courts
- ✅ Name + Email only
- 🔒 Prevents double booking

## 🔗 Example Booking URL
```
https://iah-booking.vercel.app
```
