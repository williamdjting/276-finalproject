const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/accounts", async (req, res) => {
  const userAccountData = await pool.query(
    "SELECT * FROM users u WHERE u.type=$1",
    ["regular"]
  );
  res.send(userAccountData);
  console.log(userAccountData);
});

module.exports = router;
