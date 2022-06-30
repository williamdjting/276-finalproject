//require package
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

//init variables
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 5000;

//use
app.use(express.static(publicPath));
app.use(bodyParser.json());

//get
app.get('/', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});
app.get('/api/hello', (req, res) => {
   res.send({ express: 'Hello From Express' });
 });

 //post
 app.post('/api/data', (req, res) => {
   console.log(req.body);
   res.send(
     `I received your POST request. This is what you sent me: ${req.body.username}`,
   );
 });

//listen
app.listen(port, () => {
   console.log(`Server is up! port: ${port}`);
});
