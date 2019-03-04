var axios = require('axios');

//axios.defaults.headers.common = {'Authorization': 'bearer xxxxxxxxx'};

// Gets a user's profile and repository data
// Returns an object with the user's profile and calculated score
function getUserData(player) {
  return axios.all([
    getProfile(player),
    getRepos(player),
  ])
    .then(function (data) {
      var profile = data[0];
      var repos = data[1];

      return {
        profile,
        score: calculateScore(profile, repos),
      };
    });
}

// Gets a user's profile information from Github
function getProfile (username) {
  return axios.get('https://api.github.com/users/' + username)
    .then(function (user) {
      return user.data;
    });
}

// Gets a user's repository information from Github
function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos');
}

// Calculates the total number of stars across all of a user's repositories
function getStars(repos) {
  return repos.data.reduce(function (count, repo) {
    return count + repo.stargazers_count;
  }, 0);
}


// Calculates a user's score based on # of followers and # of stars
function calculateScore(profile, repos) {
  var followers = profile.followers;
  var totalStars = getStars(repos);

  return (followers * 3) + totalStars;
}

// Basic error handler
function handleError(error) {
  // eslint-disable-next-line no-console
  console.warn(error);

  return null;
}

// Sort an array of players by their score
function sortPlayers(players) {
  return players.sort(function (a,b) {
    return b.score - a.score;
  });
}

module.exports = {
  battle (players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
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