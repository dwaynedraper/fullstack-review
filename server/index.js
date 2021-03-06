const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github.js');
const database  = require('../database/index.js')

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/fetchrepos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.username;
  helpers.getReposByUsername(username, async (err, results)  => {
    if (err) {
      res.send(err);
    } else {
      await results.map((result) => {
        database.save(result)
      })
      res.sendStatus(200);
    }
  })

});

app.get('/getrepos', function (req, res) {
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



