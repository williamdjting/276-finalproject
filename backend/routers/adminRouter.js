const express = require("express");
const router = express.Router();
const pool = require("../db");
const queries = require("../queries")

router.get("/accounts",(req, res) => {
  queries.getAllUsers(req, res);
});

module.exports = router;
