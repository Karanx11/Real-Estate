const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("dns");

// 🔧 Fix SRV DNS issues (important for MongoDB Atlas)
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

dotenv.config();

const app = express();
const connectDB = require("./config/db");

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/properties", require("./routes/propertyRoutes"));
app.get("/", (req, res) => {
  res.send("CRM API Running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});