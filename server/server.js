const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

var registerRoutes = require("./routes/register");
var loginRoutes = require("./routes/login");

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
