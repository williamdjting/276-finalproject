const express = require("express");
const router = express.Router();
const pool = require("../db");
const queries = require("../queries")

router.get("/accounts",(req, res) => {
  queries.getAllUsers(req, res);
});

router.post("/modify/nickname",(req, res) => {
  console.log("modify nickname posted")
  queries.updateNickname(req,res);
});


router.post("/modify/password",(req, res) => {
  console.log("modify password posted")
  queries.updatePassword(req,res);
});


module.exports = router;
