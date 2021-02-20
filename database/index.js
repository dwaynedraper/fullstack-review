const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetchertest', { useMongoClient: true });
mongoose.Promise = require('bluebird');

// TODO : Should I add the 'new' keyword?

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoId: {
    type: String,
    unique: true
  },
  repoName: String,
  userId: Number,
  userName: String,
  createdAt: Date,
  url: String,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  //TODO - instantiate a check to see if repo exists after getting save function working
  let mongoRepo = {
    repoId: repo.id,
    repoName: repo.name,
    userId: repo.owner.id,
    userName: repo.owner.login,
    createdAt: repo.created_at,
    url: repo.html_url,
    watchers: repo.watchers
  };
  Repo.findOneAndUpdate({repoId: repo.id}, mongoRepo, {upsert:true}, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Success saving ${repo.name}`);
    }
  })
};

let getAllRepos = (callback) => {
  Repo.find({}, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  }).sort({watchers: -1}).limit(50);
}

module.exports.save = save;
module.exports.getAllRepos = getAllRepos;