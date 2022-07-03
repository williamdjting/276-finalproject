const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");

router.post("/login", async (req,res) => {
  console.log("login posted");

  let username = req.body.username;
  let password = req.body.password;
 
 const loginData = await pool.query("SELECT id, username, passhash FROM users u WHERE u.username=$1", [username]);

 if(loginData.rowCount > 0){ 
    let isPasswordMatch = await bcrypt.compare(password, loginData.rows[0].passhash);
    console.log("passhash:" + loginData.rows[0].passhash);
    console.log("pwd" + password);
    if(isPasswordMatch){
        res.json({login:true, username}) //test
        console.log("correct login");
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
    "SELECT username from users WHERE username = '" + username + "'"
  );

  //Register the user if no duplicated user
  if (getUser.rowCount === 0) {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUserQuery = await pool.query(
      "Insert Into users(nickname,username,passhash) VALUES ($1,$2,$3) RETURNING username",
      [name,username, hashedPass]
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
