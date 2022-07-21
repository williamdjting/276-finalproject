const express = require("express");
const router = express.Router();
const pool = require("../db");
const queries = require("../queries");

  router.post("/get/userInfo",(req,res) => {
    queries.getUserInfo(req,res);
  });

module.exports = router;