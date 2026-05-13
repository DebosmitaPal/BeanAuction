# BeanAuction ☕

A real-time auction platform for bean enthusiasts built with modern web technologies. Bid on rare coffee beans, create auctions, and connect with other collectors in real-time.

---

## ✨ Features

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Real-time Bidding**: Live auction updates using WebSocket (Socket.io)
- **Create Auctions**: Users can create and list coffee bean auction 
- **Bid Management**: Place, track, and manage bids on auction items
- **User Dashboard**: View active auctions, bidding history, and profile
- **Protected Routes**: Secure frontend routes with authentication
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop
- **Payment Integration**: Demo payment processing capabilities

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) + bcryptjs
- **Real-time**: Socket.io
- **Middleware**: CORS, dotenv for environment management
- **Containerization**: Docker

### Frontend
- **Framework**: React 19.x
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Lucide React icons
- **Routing**: React Router 7.x
- **HTTP Client**: Axios
- **Real-time**: Socket.io-client
- **Date Handling**: date-fns
- **Linting**: ESLint
- **Containerization**: Docker + Nginx

---

## 📁 Project Structure

```
BeanAuction/
├── backend/                          
│
├── frontend/         
│
├── jenkins/
|              
├── docker-compose.yml                       
└── Jenkinsfile                      
```

---

## 📦 Prerequisites

- **Node.js** >= 16.x
- **npm** or **yarn**
- **MongoDB** (local or Atlas cloud database)
- **Docker** & **Docker Compose** (for containerized deployment)
- **Git**

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/BeanAuction.git
cd BeanAuction
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example and update values)
cp .env.example .env
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

---

## 🎯 Running the Application

### Option 1: Local Development (without Docker)

#### Terminal 1 - Backend Server

```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

#### Terminal 2 - Frontend Development Server

```bash
cd frontend
npm run dev
# App opens on http://localhost:5173 (or as shown in terminal)
```

### Option 2: Docker Compose (Recommended)

```bash
# From root directory
docker-compose up --build

# Backend: http://localhost:5000
# Frontend: http://localhost:3000
# Jenkins: http://localhost:8080
```

To stop the containers:

```bash
docker-compose down
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Server
PORT=5000

# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bean_auction?retryWrites=true&w=majority

# JWT Secret (use a strong, random string)
JWT_SECRET=your_jwt_secret_key_here
```

---

## 🎉 Happy Auctioning!

Enjoy the BeanAuction platform and happy bidding! 🫘✨

Made by Debosmita Pal ☕︎
