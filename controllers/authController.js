const CryptoJS = require("crypto-js");
const { User, ReesetPass } = require("../models/authModel");
const mailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let transporter = mailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, //secure port for modern apps with TLC encryption
  secure: false, //only true when using 465 port
  auth: {
    user: "techcreed.tech@gmail.com",
    pass: "imjivwbwsiullrsp",
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Mail Server Check.................ok");
  }
});

const createToken_PR = (id) => {
  return jwt.sign({ id }, "^&*(wndi>$#dhwdhw&*(wdmonwdjdw$#@dwiidbiduwi$%");
};

const send_mail_reset = async (
  usr_mail,
  tmp_db_data,
  tmp_token,
  usr_id,
  usr_name
) => {
  var reset_link =
    "http://localhost:3000/auth/mail-verification/" +
    tmp_db_data +
    "/" +
    tmp_token +
    "/" +
    usr_id;

  let info = await transporter.sendMail({
    from: "techcreed.tech@gmail.com",
    to: usr_mail,
    subject: "Password Reset link",
    html: `<div style=text-align:center' ;>
        <br />
        <h1 style='text-align:left' ;>Hello ${usr_name},</h1>
        <h2 style='text-align:center;'><b><a href=${reset_link} target='_blank'>Click To Reset Password</a></b></h2>
        <p>Link Will be expires in 30 minutes. System generated mail dont replay</p>
        <br />
        <br />
    </div>`,
  });
};

const ResetPass = async (req, res) => {
  ReesetPass.find({ username: req.body.username }, function (err, pass_docs) {
    if (pass_docs.length === 0) {
      User.find({ username: req.body.username }, function (err, user_docs) {
        if (user_docs.length === 0) {
          return res.send({ message: "user not found" });
        } else {
          if (user_docs[0].email === req.body.mail_id) {
            var tmp_doc = new ReesetPass(req.body);
            tmp_doc.save().then(async (result) => {
              const temp_db_data = await ReesetPass.findOne({
                username: req.body.username,
              }).lean();
              const enc_temp_data = createToken_PR(temp_db_data);
              send_mail_reset(
                req.body.mail_id,
                temp_db_data._id,
                enc_temp_data,
                user_docs[0]._id,
                user_docs[0].username
              ).catch(console.error);
              res.send(
                JSON.stringify({
                  message: "Check your Registered Mail ID to reset password",
                  token: enc_temp_data,
                })
              );
            });
          } else {
            res.send({ message: "Username / Mail Mismatch" });
          }
        }
      });
    } else {
      res.send({ message: "Already Registered Try Again 30min later" });
    }
  });
};

const MailVerified = async (req, res) => {
  var strongPassword = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"
  );
  if (!strongPassword.test(req.body["password"])) {
    res.send(
      JSON.stringify({
        message:
          "Password Must Contain [1 UpperCase, 1 LowerCase,1 Number, At least 6 Chracter]",
      })
    );
  } else {
    const get_cookie = jwt.verify(
      req.params["tmp_token"],
      "^&*(wndi>$#dhwdhw&*(wdmonwdjdw$#@dwiidbiduwi$%"
    );

    const user = await User.findOne({
      username: req.body["username"],
    }).lean();

    const verify = await ReesetPass.findOne({
      _id: get_cookie.id._id,
    }).lean();

    if (user && verify) {
      var new_password = CryptoJS.AES.encrypt(
        req.body.password,
        "techcreed"
      ).toString();
      User.updateOne(
        { username: req.body["username"] },
        { password: new_password },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(JSON.stringify({ message: "CleanRun" }));
          }
        }
      );
    } else {
      res.send(JSON.stringify({ message: "Username/Link Invalid" }));
    }
  }
};

const login = (req, res) => {
  User.find({ username: req.body.user_name }, function (err, docs) {
    if (docs.length === 0) {
      return res.send({ message: "user not found" });
    } else {
      let found = false;
      docs.forEach((d) => {
        var decrypted_password = CryptoJS.AES.decrypt(
          d.password,
          "techcreed"
        ).toString(CryptoJS.enc.Utf8);
        if (req.body.password === decrypted_password) {
          found = true;
          res.send({ id: d["_id"] });
        }
      });
      if (!found) {
        res.send({ message: "wrong password" });
      }
    }
  });
};
const signup = (req, res) => {
  var password = CryptoJS.AES.encrypt(req.body.password, "techcreed");
  var code = Math.floor(100000 + Math.random() * 900000);

  User.find(
    { username: req.body.fullname, email: req.body.email },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        if (docs.length === 0) {
          const newUser = new User({
            username: req.body.fullname,
            password: password,
            email: req.body.email,
          });
          newUser
            .save()
            .then((result) => {
              let transporter = mailer.createTransport({
                service: "gmail",
                auth: {
                  user: "techcreed.tech@gmail.com",
                  pass: "imjivwbwsiullrsp",
                },
              });
              let mailoption = {
                to: result["email"],
                subject: "SelfTaught - Verification Code",
                html:
                  "<p>Veification code - " +
                  String(code) +
                  " This is system generated mail.Don't respond it</p>",
              };
              transporter.sendMail(mailoption, (error, info) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log(info.response);
                }
              });
              res.send({ uid: result["_id"], verificationCode: code });
            })
            .catch((err) => console.log(err));
        } else {
          res.send({ message: "user already found" });
        }
      }
    }
  );
};
module.exports = {
  login,
  signup,
  ResetPass,
  MailVerified,
};
