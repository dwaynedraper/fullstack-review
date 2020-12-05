const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github.js')

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('username: ', req.body.username);
  let username = req.body.username;
  helpers.getReposByUsername(username)
  .then((results) => {
    database.save(results.data);
  })
  .catch((error) => {
    console.log(error);
  })

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

