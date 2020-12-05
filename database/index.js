const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useMongoClient: true });

// TODO : Should I add the 'new' keyword?
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoId: Number,
  repoName: String,
  userId: Number,
  userName: String,
  createdAt: Date,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repos.forEach((repo) => {
    //TODO - instantiate a check to see if repo exists after getting save function working
    let mongoRepo = new Repo({
      repoId: repo.id,
      repoName: repo.name,
      userId: repo.owner.id,
      userName: repo.owner.login,
      createdAt: repo.created_at,
      url: repo.html_url
    });
    mongoRepo.save((err, mongoRepo) => {
      if (err) return console.error(err);
    })
  })


}

module.exports.save = save;