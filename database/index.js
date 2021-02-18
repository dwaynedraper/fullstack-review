const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetchertest', { useMongoClient: true });
mongoose.Promise = require('bluebird');

// TODO : Should I add the 'new' keyword?

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoId: {
    type: String,
    index: true,
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
  let mongoRepo = new Repo({
    repoId: repo.id,
    repoName: repo.name,
    userId: repo.owner.id,
    userName: repo.owner.login,
    createdAt: repo.created_at,
    url: repo.html_url,
    watchers: repo.watchers
  });
  console.log('mongoRepo', mongoRepo)
  Repo.updateOne({repoId: repo.id}, mongoRepo, {upsert:true}, (err, results) => {
    if (err) {
      // console.error(err);
    } else {
      console.log('success saving')
    }
  })
};

let getAllRepos = (callback) => {
  Repo.find({}, (err, results) => {
    if (err) {
      // console.log(err);
      callback(err);
    } else {
      callback(null, results);
    }
  }).sort({watchers: -1}).limit(25);
}

module.exports.save = save;
module.exports.getAllRepos = getAllRepos;