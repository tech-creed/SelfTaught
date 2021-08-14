const express = require("express");
const authRoutes = require("./routes/authRoutes");
const UserEditRoutes = require("./routes/userProfileRoutes");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
    "mongodb+srv://TechCreed:techcreedmongo@cluster0.j5ew1.mongodb.net/db?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then((result) => {
    app.listen(4000, function () {
      console.log("Backend Server Listening on Port 4000");
    });
  })
  .catch((err) => console.log(err));



  app.use("/auth", authRoutes);
  app.use("/user", UserEditRoutes);