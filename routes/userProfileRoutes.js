const express = require("express");
const userProfileController = require("../controllers/userProfileController");

const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
var GridFS = Grid(mongoose.connection, mongoose.mongo);

GridFS.collection('User_Image')

const storage = new GridFsStorage({
    url: "mongodb+srv://TechCreed:techcreedmongo@cluster0.j5ew1.mongodb.net/db?retryWrites=true&w=majority",
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "User_Image",
          };
          console.log(filename)
          resolve(fileInfo);
        });
      });
    },
  });
  const upload = multer({ storage });

const routes = express();

routes.post("/upload_user_dp", upload.single("usr_img"), (req, res) => {
  //Find Image by Filename
  //user_img = GridFS.files.find({ filename: imgFileName });
  res.redirect("/");
});


routes.post("/upload_basic", userProfileController.BasicUpload);
routes.post("/upload_notable_media", userProfileController.NotableMediaUpload);
routes.post("/user_works", userProfileController.UserWorkUpload);

routes.get("/user_details", userProfileController.UserDetails);



module.exports = routes;
