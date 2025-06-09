
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")
const { connectDatabase } = require("./config/database.js");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");
const cors = require("cors");
require('dotenv').config();
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }


))
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", (req, res) => {
  res.send("404 Page Not Found");
})
connectDatabase()
  .then(() => {
    console.log("Connected to database");

    app.listen(process.env.PORT||3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error in DB connection:", err);
  });