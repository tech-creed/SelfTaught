const express = require("express");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const app = express();
const cors = require("CORS");

mongoose
  .connect(
    "mongodb+srv://TechCreed:techcreedmongo@cluster0.j5ew1.mongodb.net/db?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use("/auth", authRoutes);
    app.listen(process.env.port || 4000);
  })
  .catch((err) => console.log(err));

app.listen(process.env.port || 4000, function () {
  console.log("listening..");
});
