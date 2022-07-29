//require package
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

//routers and endpoints
const userRoute = require("./routers/authRouter");
const adminRoute = require("./routers/adminRouter");
const emailRoute = require("./routers/emailRouter");
const profileRoute = require("./routers/profileRouter");
//commented out until this is actually existing and needed const requestRoute = require("./routers/requestRouter");
const queries = require("./queries");
const requests = require("./requestQueries");

//init variables
const app = express();
const publicPath = path.join(__dirname, "..", "frontend", "build");
const port = process.env.PORT || 4000;

//use
app.use(express.static(publicPath));
app.use(bodyParser.json());
////commented out until this is actually existing and needed  app.use('/request', requestRoute);

// get
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/api/users", (req, res) => {
  queries.getAllUsers(req, res);
});

app.post("/adduser", (req, res) => {
  queries.createUser(req, res);
});

app.post("/generateUserTable", async (req, res) => {
  var result = await queries.generateUserTable(req, res);
});

app.post("/getUserData/:userid", (req, res) => {
  queries.getUserData(req, res);
});

app.post("/getNickname/:userid", (req, res) => {
  queries.getUserNickname(req, res);
});

app.post("/resetPassword", (req, res) => {
  queries.resetPassword(req, res);
});

app.use("/auth", userRoute);
app.use("/admindata", adminRoute);
app.use("/email", emailRoute);
app.use("/profile", profileRoute);
//post
/*
 app.post('/api/data', (req, res) => {
   console.log(req.body);
   res.send(
     `I received your POST request. This is what you sent me: ${req.body.username}`,
   );
 });
*/

app.post("req/open", (req, res) => {
  requests.viewAllOpenRequests(req, res);
});

app.post("req/closed", (req, res) => {
  requests.viewAllClosedRequests(req, res);
});

app.use("/auth", userRoute);
app.use("/admindata", adminRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

//listen
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is up! port: ${port}`);
  });
}
module.exports = app;
