const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");

// Cookie packages
// const sessions = require('express-session')
// const cookieParser = require("cookie-parser");
// const pgSession = require('connect-pg-simple')(sessions)

// cookie maker
// const oneDay = 1000 * 60 * 60 * 24;
// const oneHour = 1000 * 60 * 60;
// const oneMin = 1000 * 60;

// const sessionConfig = {
//   store: new pgSession({
//     pool: pool,
//     tableName: 'session'
//   }),
//   name: 'loginAuth',
//   secret: randomString.generate({
//     length: 14,
//     charset: 'alphanumeric'
//   }),
//   saveUninitialized: true,
//   cookie: {
//     maxAge: oneDay,
//     secure: false //only use on HTTPS
//   },
//   resave: false
// }

// set maxAge to NULL for the browser to delete on close
// router.use(sessions(sessionConfig));

// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));
// router.use(cookieParser());
// var session;

router.post("/login", async (req,res) => {
  console.log("login posted");

  let username = req.body.username;
  let password = req.body.password;
 
 const loginData = await pool.query("SELECT id, username, password FROM loginauth u WHERE u.username=$1", [username]);

 if(loginData.rowCount > 0){ 
    let isPasswordMatch = await bcrypt.compare(password, loginData.rows[0].password);
    console.log("password:" + loginData.rows[0].password);
    console.log("pwd: " + password);
    if(isPasswordMatch){
        res.json({login:true, username: username, type: loginData.rows[0].type}) //test
        console.log("correct login");
      //added session
      // session = req.session;
      //   session.userid = req.body.username;
      //   console.log("correct login. Session is: $1", [req.session]);
    }
    else{
        res.json({login:false, status: "Error: Wrong Password"}) //test
        console.log("Error: Wrong Password");
    }
}
else {
    res.json({login:false, status: "Error: User Not Existed"}) //test
    console.log("Error: User Not Existed");
}

});

router.post("/signup", async (req, res) => {

  let name = req.body.name;
  let username = req.body.username;
  //let email = req.body.email;
  let password = req.body.password;

  //Check identify user in the system
  const getUser = await pool.query(
    "SELECT username from loginauth WHERE username = '" + username + "'"
  );

  //Register the user if no duplicated user
  if (getUser.rowCount === 0) {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUserQuery = await pool.query(
      "Insert Into loginauth (nickname,username,password,type) VALUES ($1,$2,$3,$4) RETURNING username",
      [name,username,hashedPass,"regular"]
    );
    res.json({signup:true, username}) //test
    // session = req.session;
    // session.userid = req.body.username;
    // console.log("correct signup");
  }

  else{
    res.json({signup:false, status:  "username taken" }) //test
    console.log("wrong signup");
  }
});

//When clicking logout, the session needs to be destroyed so we do not join the login again by accident
router.get('/logout', (req, res) => {
  // req.session.destroy();
  res.redirect('/');
});


module.exports = router;
