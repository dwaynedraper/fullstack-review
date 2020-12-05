const axios = require('axios');
const config = require('../config.js');
const database = require('../database/')

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  console.log('get repos called')
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios.get(options.url, options.headers)
  .then((results) => {
    database.save(results);
  })
  .catch((error) => {
    console.log(error);
  })

}

module.exports.getReposByUsername = getReposByUsername;