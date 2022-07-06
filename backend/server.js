//require package
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

//routers and endpoints
const userRoute = require("./routers/authRouter");
const adminRoute = require("./routers/adminRouter");
const queries = require("./queries")

//init variables
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 4000;

//use
app.use(express.static(publicPath));
app.use(bodyParser.json());

//get
app.get('/', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});
app.get('/api/users', (req, res) => {
  queries.getAllUsers(req, res);
 });
 app.use('/auth', userRoute);
 app.use('/admindata', adminRoute);
 //post
 /*
 app.post('/api/data', (req, res) => {
   console.log(req.body);
   res.send(
     `I received your POST request. This is what you sent me: ${req.body.username}`,
   );
 });
*/
//listen
app.listen(port, () => {
   console.log(`Server is up! port: ${port}`);
});
