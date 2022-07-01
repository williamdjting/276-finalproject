const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");

router.post("/login", async (req,res) => {
  console.log("login posted");
 
 const loginData = await pool.query("SELECT id, username FROM users u WHERE u.username=$1", [req.body.username]);

 if(loginData.rowCount > 0){ 
    const isPasswordMatch = bcrypt.compare(req.body.password, loginData.rows[0].passhash);
    if(isPasswordMatch){
        res.json({login:false, username}) //test
        console.log("correct login");
    }
    else{
        res.json({login:false, status: "wrong password"}) //test
        console.log("wrong password");
    }
}
else {
    res.json({login:false, status: "user not exist"}) //test
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
      [nickname,username, hashedPass]
    );
    res.json({login:true, username}) //test
    console.log("correct signup");
  }

  else{
    res.json({login:false, status:  "username taken" }) //test
    console.log("wrong signup");
  }
});

module.exports = router;
