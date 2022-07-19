const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const pool = require("../db");

//our email configuration
const user = {
  mail: "splittr276@gmail.com", //gmail account
  pass: "hdpeawuzcsdosvzz", //account password
};

//mailling function
const mail = (email, message) => {
  console.log("Mailing...............");

  //create a transporter to auth email log in
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user.mail,
      pass: user.pass,
    },
  });

  //mail content setting
  var mailOptions = {
    from: user.mail, //our email adress
    to: email,
    subject: "EMAIL CONFIRMATION",
    text: `Confirmation Pins is ${message}`,
  };

  //send the email to the user
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
//end of mail functions===============>

let code;
let email;
//send the code to email
router.post("/sendCode", async (req, res) => {
  code = Math.random().toString().substring(2, 8);

  const getEmail = await pool.query(
    "SELECT email FROM loginauth WHERE email = '" + req.body.email + "'"
  );

  if (getEmail.rowCount === 0) {
    //mail the code to the email
    mail(req.body.email, code);
    email = req.body.email;
    res.json({ isSent: true });
    console.log("code " + code + "send to user" + req.body.email);
  }

  else{res.json({isSent: false, status: "Email Already Taken"})}
});

//check if the code matches the input
router.post("/confirmCode", (req, res) => {
  if (req.body.code == code && req.body.email == email) {
    res.json({ isMatched: true });
  } else if (req.body.email != email) {
    res.json({ isMatched: false, status: "Please Resend the code" });
  } else {
    res.json({ isMatched: false, status: "Code is Not Valid" });
  }
});


module.exports = router;
