const axios = require('axios');
const config = require('../config.js');
const database = require('../database/')

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
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
  .then((response) => {
    console.log('response', response.data.length, typeof(response.data));
    callback(null, response.data);
  })
  .catch((error) => {
    callback(error);
  })

}

module.exports.getReposByUsername = getReposByUsername;