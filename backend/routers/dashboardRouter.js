const express = require("express");
const router = express.Router();
const pool = require("../db");
const query = require("../requestQueries");

//verify if the user name entered is valid
router.post("/verify/user", async (req, res) => {
  const input = req.body.input;
  const arr = req.body.arr;
  console.log("isEmail: " + input.includes("@"));
  var emailQuery = "SELECT * FROM loginauth WHERE email = '" + input + "'";
  var usernameQuery =
    "SELECT * FROM loginauth WHERE username = '" + input + "'";

  if (input == "" || input == null) {
    res.json({ valid: false, status: "Input cannot be empty" });
  }

  //if input is an email address
  if (input.includes("@")) {
    const emailData = await pool.query(emailQuery);

    //if the email is not found from database
    if (emailData.rowCount === 0) {
      res.json({ valid: false, status: "Email does not exists in database" });
      //console.log("type: "+emailData.rows[0].type);
    } else {
      if (arr.includes(emailData.rows[0].userid)) {
        res.json({ valid: false, status: "User already added to list" });
      } else {
        res.json({ valid: true, userid: emailData.rows[0].userid });
      }
    }
  } //end of if

  //if input is username
  else {
    let usernameData = await pool.query(usernameQuery);
    if (usernameData.rowCount === 0) {
      res.json({
        valid: false,
        status: "Username does not exists in database",
      });
    } else {
      if (arr.includes(usernameData.rows[0].userid)) {
        res.json({ valid: false, status: "User already in the list" });
      } else {
        res.json({ valid: true, userid: usernameData.rows[0].userid });
      }
    }
  } //end of else
});

router.post("/sendRequest", (req, res) => {

    query.createNewRequestSerialized(req, res);

});

module.exports = router;
