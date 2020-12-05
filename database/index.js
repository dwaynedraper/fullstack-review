const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// TODO : Should I add the 'new' keyword?
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoId = Number,
  repoName = String,
  userId = Number,
  userName = String,
  createdAt = Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

}

module.exports.save = save;