const express = require("express");
const router = express.Router();
const pool = require("../db");
const queries = require("../queries")
const requests = require("../requestQueries")

router.get("/open",(req, res) => {
    requests.viewAllOpenRequests(req, res);
});

router.get("/closed",(req, res) => {
    requests.viewAllClosedRequests(req, res);
  });

router.post("/modify/nickname",(req, res) => {
  console.log("modify nickname posted")
  queries.updateNickname(req,res);
});

router.post("/modify/password",(req, res) => {
  console.log("modify password posted")
  queries.updatePassword(req,res);
});


router.post("/delete/user/:id",(req, res) => {
  console.log("delete user posted")
  queries.deleteUser(req,res);
});


module.exports = router;
