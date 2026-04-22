const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("dns");

// Fix SRV DNS issues (MongoDB Atlas)
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

dotenv.config();

const app = express();
const connectDB = require("./config/db");

// Connect Database
connectDB();

// CORS (IMPORTANT for frontend connection)
app.use(
  cors({
    origin: "*", // you can restrict later to your frontend URL
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/properties", require("./routes/propertyRoutes"));

// Health check route
app.get("/", (req, res) => {
  res.send("CRM API Running...");
});

// PORT for Render
const PORT = process.env.PORT || 5000;

// tart server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});