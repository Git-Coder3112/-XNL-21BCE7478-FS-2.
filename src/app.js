require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const dietRoutes = require("./routes/dietRoutes");
const { verifyToken, checkRole } = require("./middlewares/authMiddleware");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Connect to Database
connectDB();

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(limiter);


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/diets", dietRoutes);



app.use("/api/diets", dietRoutes);

console.log({ authRoutes, userRoutes, workoutRoutes, dietRoutes });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
