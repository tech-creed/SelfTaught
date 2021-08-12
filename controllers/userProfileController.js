const CryptoJS = require("crypto-js");
const { User, ReesetPass } = require("../models/userModel");
const bcrypt = require("bcryptjs");

const storage = new GridFsStorage({
    url: "-----MONGO DB URI-----",
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "UserProfileImage",
          };
          resolve(fileInfo);
        });
      });
    },
  });

const upload = multer({ storage });