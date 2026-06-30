# 🏡 StayHub - Airbnb Clone

StayHub is a full-stack **MERN Stack** web application inspired by Airbnb, where property owners (Admins) can list their properties, and users can discover, review, and book accommodations with a clean and responsive interface.

---

## 🌐 Live Demo

### Frontend
https://stay-hub-ruddy.vercel.app/
### Backend API
https://stayhub-jekv.onrender.com/
### Demo Video
coming soon..
---

# 📸 Screenshots

> Add screenshots after deployment.

| Home Page | Property Details |
|------------|------------------|
| Home Screenshot | Property Details Screenshot |

| Login | Add Property |
|-------|--------------|
| Login Screenshot | Add Property Screenshot |

| My Bookings | Reviews |
|-------------|----------|
| Booking Screenshot | Reviews Screenshot |

---

# ✨ Features

## 🔐 Authentication & Authorization

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Admin & Normal User Roles

---

## 🏠 Property Management

- View All Properties
- View Property Details
- Add Property (Admin Only)
- Edit Property (Admin Only)
- Delete Property (Admin Only)
- Cloudinary Image Upload

---

## 🔍 Search & Sorting

- Search by Location
- Sort Price (Low → High)
- Sort Price (High → Low)

---

## ⭐ Reviews & Ratings

- Add Review
- Give Ratings
- Display Reviews
- Average Rating

---

## 📅 Booking System

- Book Property
- View My Bookings

---

## 🎨 UI Features

- Responsive Design
- Tailwind CSS
- Protected Navigation
- Clean Component Structure

---

# 🚀 Tech Stack

## Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Context API

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- Multer
- Cloudinary

---

## Database

- MongoDB
- Mongoose

---

# 📁 Folder Structure

```
StayHub
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── uploads
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │
│   ├── components
│   ├── context
│   ├── pages
│   ├── services
│   ├── assets
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/rameshwar-urdukhe/StayHub.git

cd stayhub
```

---

# Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

Start Backend

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 📡 REST API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

---

## Properties

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/properties | Get All Properties |
| GET | /api/properties/:id | Get Single Property |
| POST | /api/properties | Add Property |
| PUT | /api/properties/:id | Update Property |
| DELETE | /api/properties/:id | Delete Property |

---

## Reviews

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/reviews | Add Review |
| GET | /api/reviews/:propertyId | Get Reviews |

---

## Upload

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/upload | Upload Property Image |

---

## Bookings

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/bookings | Book Property |
| GET | /api/bookings/my-bookings | Get User Bookings |

---

# 🗄️ Database Schema

### User

```
Name
Email
Password
Role (Admin/User)
```

### Property

```
Title
Description
Location
Price
Image
Owner
```

### Review

```
User
Property
Rating
Comment
```

### Booking

```
User
Property
Check In
Check Out
Total Price
```

---

# 🧠 What I Learned

This project helped me gain hands-on experience with:

- MERN Stack Development
- REST API Design
- MongoDB Relationships
- JWT Authentication
- Role-Based Access Control
- CRUD Operations
- React Context API
- Cloudinary Image Upload
- Search & Sorting
- Booking System
- Component-Based Architecture
- Deployment Workflow
- Git & GitHub

---

# 🚧 Future Improvements

- ❤️ Wishlist
- 📍 Google Maps Integration
- 💳 Online Payments (Stripe/Razorpay)
- 📅 Property Availability Check
- 📧 Email Notifications
- 📱 Progressive Web App (PWA)
- 🔔 Real-time Notifications
- 👤 User Profile
- 📊 Admin Dashboard Analytics
- 🏷️ Property Categories
- 🔄 Pagination & Infinite Scroll
- 🌙 Dark Mode
- 🔍 Advanced Filters
- 🚫 Cancel Booking

---

# 💻 GitHub Repository

Repository

https://github.com/your-username/stayhub

---

# 👨‍💻 Author

**Rameshwar Patil**

📧 Email

your-email@example.com

🐙 GitHub

https://github.com/your-github-username

💼 LinkedIn

https://linkedin.com/in/your-linkedin

🌐 Portfolio

https://your-portfolio-link.com

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📜 License

This project is licensed under the **MIT License**.

---

# ⭐ Show Your Support

If you like this project, please consider giving it a **⭐ Star** on GitHub.

It motivates me to build more real-world MERN Stack projects.

---

## 🙌 Acknowledgements

- Airbnb (UI/Concept Inspiration)
- MongoDB
- Express.js
- React.js
- Node.js
- Cloudinary
- Tailwind CSS
- JWT
- Vercel
- Render

---

**Built with ❤️ using the MERN Stack**
