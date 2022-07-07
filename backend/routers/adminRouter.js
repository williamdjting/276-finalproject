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


router.post("/delete/user/:id",(req, res) => {
  console.log("delete user posted")
  queries.deleteUser(req,res);
});


module.exports = router;
