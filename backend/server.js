const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
connectDB();

const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const reviewRoutes = require('./routes/reviewRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const bookingRoutes = require("./routes/bookingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");



const app = express();
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://stay-hub-ruddy.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
}); 

// app.post("/test", (req, res) => {
//   console.log("TEST ROUTE HIT");

//   res.json({
//     success: true,
//   });
// });

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/wishlist", wishlistRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
