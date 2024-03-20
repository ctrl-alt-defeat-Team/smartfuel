const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

app.use(cors());

var registerRoutes = require("./routes/register");
var loginRoutes = require("./routes/login");
var searchProductRoutes = require("./routes/searchProduct");
var verifyTokenRoutes = require("./routes/verifyToken");
var updateUserRoutes = require("./routes/updateUser");
var getUserRoutes = require("./routes/getUser");
var saveCartRoutes = require("./routes/saveCart");
var addProductRoutes = require("./routes/addProduct");
var approveProductRoutes = require("./routes/approveProduct");

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3"] });
});

const CONNECTION_URL =
  "mongodb+srv://" +
  process.env.MONGO_ADMIN +
  ":" +
  process.env.MONGO_PASSWORD +
  "@cluster0.0zr8trf.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/api/search", searchProductRoutes);
app.use("/api/tokenVerify", verifyTokenRoutes);
app.use("/api/updateUser", updateUserRoutes);
app.use("/api/getUser", getUserRoutes);
app.use("/api/saveCart", saveCartRoutes);
app.use("/api/addProduct", addProductRoutes);
app.use("/api/approveProduct", approveProductRoutes);
