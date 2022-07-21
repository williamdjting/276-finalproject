const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const { queries } = require("@testing-library/react");
const cusQuery = require("../queries")
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
 
//  const loginData = await pool.query("SELECT id, username, passhash FROM users u WHERE u.username=$1", [username]);
onsole.log("login posted")
//===== using prod DB =====
const loginData = await pool.query("SELECT userid, username, password, type FROM loginauth u WHERE u.username=$1", [username]);
//=========================
  
  if (loginData.rowCount > 0) { 
    console.log(loginData.rows[0].passhash)
    console.log(loginData.rows[0])


    // let isPasswordMatch = await bcrypt.compare(password, loginData.rows[0].passhash);
    // console.log("passhash:" + loginData.rows[0].passhash);

    //===== using prod DB =====
    let isPasswordMatch = await bcrypt.compare(password, loginData.rows[0].password);
    console.log("passhash:" + loginData.rows[0].password);
    //=========================

    console.log("pwd" + password);
    if(isPasswordMatch){
        res.json({login:true, username: username, role: loginData.rows[0].type, id: loginData.rows[0].userid},) //test
        console.log("id : " + loginData.rows[0].userid);
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

// gotta wait 1 second for the signup sync to work...
// pls fix if you got a better way
function resolveAfter1Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 1000);
  });
}

router.post("/signup", async (req, res) => {

  let name = req.body.name;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  //Check identify user in the system
  // const getUser = await pool.query(
  //   "SELECT username FROM users WHERE username = '" + username + "'"
  // );

  //===== using prod DB =====
  const getUser = await pool.query(
    "SELECT username FROM loginauth WHERE username = '" + username + "'"
  );
  //=========================

  //Register the user if no duplicated user
  if (getUser.rowCount === 0) {
    const hashedPass = await bcrypt.hash(password, 10);

    // const newUserQuery = await pool.query(
    //   "Insert Into users(nickname,username,passhash) VALUES ($1,$2,$3) RETURNING username",
    //   [name,username, hashedPass]
    // );


  //===== using prod DB =====
  req.body.password = hashedPass;
    const newUserQuery = await cusQuery.createUser(req, res);
    await resolveAfter1Seconds();
    req.body.userid = newUserQuery.rows[0].userid;
    cusQuery.generateUserTable(req, res);
  //=========================
    res.json({ signup: true, username }); //test
    // session = req.session;
    // session.userid = req.body.username;
    // console.log("correct signup");
  }

  else{
    res.json({signup:false, status:  "username taken" }) //test
    console.log("wrong signup");
  }
});


router.post("/checkDup", async (req, res) => {

  let username = req.body.username;

  const getUser = await pool.query(
    "SELECT username FROM loginauth WHERE username = '" + username + "'"
  );
  //check duplicated user
  if (getUser.rowCount === 0) {

    res.json({ noDuplicate: true, username }); //test

  }
  else{
    res.json({noDuplicate:false, status:  "username taken" }) //test
  }
});

//When clicking logout, the session needs to be destroyed so we do not join the login again by accident
router.get('/logout', (req, res) => {
  // req.session.destroy();
  res.redirect('/');
});


module.exports = router;
