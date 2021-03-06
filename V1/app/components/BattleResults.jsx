var React = require('react');
var PropTypes = require('prop-types');
var queryString = require('query-string');
var Link = require('react-router-dom').Link;

var api = require('../utils/api');
var PlayerPreview = require('../components/PlayerPreview.jsx');
var Loading = require('../components/Loading.jsx');

// Calculate and display battle results
class BattleResults extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }

  componentDidMount () {
    // Update the 'BattleResults' component on initial mount
    var players = queryString.parse(this.props.location.search);

    api.battle([
      players.playerOneName,
      players.playerTwoName,
    ]).then(function (battleResults) {
      if (battleResults === null) {
        return this.setState(function () {
          return {
            error: 'Whoops, hit an error! Check that both users exist on Github.',
            loading: false,
          };
        }.bind(this));
      }

      this.setState(function () {
        return {
          error: null,
          loading: false,
          winner: battleResults[0],
          loser: battleResults[1],
        };
      });
    }.bind(this));
  }


  render () {
    var winner = this.state.winner;
    var loser = this.state.loser;
    var error = this.state.error;
    var loading = this.state.loading;

    if (loading === true) {
      return (<Loading text='Battling it out' />);
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>{'Reset'}</Link>
        </div>
      );
    }

    return (
      <div className='row'>
        <Player 
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player 
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    );
  }
}


function Player (props) {
  return (
    <div className='column'>
      <h2 className='player-header'>{props.label}</h2>
      <h4 style={{textAlign: 'center'}}>{'Score:'} {props.score}</h4>
      <PlayerProfile profile={props.profile} />
    </div>
  );
}


function PlayerProfile (props) {
  var profile = props.profile;
  return (
    <PlayerPreview 
      avatar={profile.avatar_url}
      username={profile.login}>
      <ul className='space-list-items'>
        {profile.name && <li>{profile.name}</li>}
        {profile.location && <li>{profile.location}</li>}
        {profile.company && <li>{profile.company}</li>}
        <li>{'Followers:'} {profile.followers}</li>
        <li>{'Following:'} {profile.following}</li>
        <li>{'Public Repos:'} {profile.public_repos}</li>
        {profile.blog && <li><a href={profile.blog}>{profile.blog}</a></li>}
      </ul>
    </PlayerPreview>
  );
}


BattleResults.propTypes = {
  location: PropTypes.object.isRequired,
};

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
};

PlayerProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

module.exports = BattleResults;