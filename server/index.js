const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github.js');
const database  = require('../database/index.js')

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.username;
  console.log('username', username);
  helpers.getReposByUsername(username, (err, results)  => {
    if (err) {
      res.send(err);
    } else {
      results.forEach((result) => {
        database.save(result)
      })
      res.sendStatus(200);
    }
  })

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  database.getAllRepos((err, results) => {
    if (err) {
      console.error('err', err);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

