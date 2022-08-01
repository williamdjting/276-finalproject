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




module.exports = router;
