const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");

// Cookie packages
const sessions = require('express-session')
const cookieParser = require("cookie-parser");
const pgSession = require('connect-pg-simple')(sessions)

// cookie maker
const oneDay = 1000 * 60 * 60 * 24;
const oneHour = 1000 * 60 * 60;
const oneMin = 1000 * 60;

const sessionConfig = {
  store: new pgSession({
    pool: pool,
    tableName: 'session'
  }),
  name: 'loginAuth',
  secret: randomString.generate({
    length: 14,
    charset: 'alphanumeric'
  }),
  saveUninitialized: true,
  cookie: {
    maxAge: oneDay,
    secure: false //only use on HTTPS
  },
  resave: false
}
// set maxAge to NULL for the browser to delete on close
router.use(sessions(sessionConfig));

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
var session;



router.post("/login", async (req, res) => {
  console.log("login posted");

  const loginData = await pool.query("SELECT id, username FROM users u WHERE u.username=$1", [req.body.username]);

  if (loginData.rowCount > 0) {
    const isPasswordMatch = bcrypt.compare(req.body.password, loginData.rows[0].passhash);
    if (isPasswordMatch) {
      res.json({ login: false, username }) //test

      //added session
      session = req.session;
      session.userid = req.body.username;

      console.log("correct login. Session is: $1", [req.session]);
    }
    else {
      res.json({ login: false, status: "wrong password" }) //test
      console.log("wrong password");
    }
  }
  else {
    res.json({ login: false, status: "user not exist" }) //test
    console.log("user not existed");
  }

});

router.post("/signup", async (req, res) => {

  var nickname = req.body.nickname;
  var username = req.body.username;
  var password = req.body.password;

  //Check identify user in the system
  const getUser = await pool.query(
    "SELECT username from users WHERE username = '" + username + "'"
  );

  //Register the user if no duplicated user
  if (getUser.rowCount === 0) {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUserQuery = await pool.query(
      "Insert Into users(nickname,username,passhash) VALUES ($1,$2,$3) RETURNING username",
      [nickname, username, hashedPass]
    );
    //added session
    res.json({ login: true, username }) //test
    session = req.session;
    session.userid = req.body.username;

    console.log("correct signup. Session is: $1", [req.session]);
  }

  else {
    res.json({ login: false, status: "username taken" }) //test
    console.log("wrong signup");
  }
});

//When clicking logout, the session needs to be destroyed so we do not join the login again by accident
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;
