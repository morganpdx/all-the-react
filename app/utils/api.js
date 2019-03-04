var axios = require('axios');

axios.defaults.headers.common = {'Authorization': 'bearer d60eff3eed4b33d46e27800b12b4de2b7a7826ca'};


function getProfile (username) {
  return axios.get('https://api.github.com/users/' + username)
    .then(function (user) {
      return user.data;
    });
}

function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos&per_page=100')
    .then(function (user) {
      return user.data;
    });
}

module.exports = {
  battle (players) {

  },
  fetchPopularRepos (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + 
        '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
      .then(function (response) {
        return response.data.items;
      });
  },
};