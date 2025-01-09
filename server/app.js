const express = require("express");
const db = require("./db/db");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
// imports
const port = process.env.PORT;
const authRoutes = require("./routes/authRotes");
const domainRoutes = require("./routes/domainRoutes");

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/domain", domainRoutes);

app.listen(port, () => {
  db();
  console.log(`Server running on port ${port}`);
});
