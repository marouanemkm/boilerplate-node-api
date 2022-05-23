const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/user-routes");

const ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:3001"];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const theOrigin = ALLOWED_ORIGINS.indexOf(origin) >= 0 ? origin : ALLOWED_ORIGINS[0];
  res.header("Access-Control-Allow-Origin", theOrigin);
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-xsrf-token, Set-Cookies");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoutes);

module.exports = app;
