var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;


// Parent component for 'Battle' page
class Battle extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    };

    this.handleUpdatePlayer = this.handleUpdatePlayer.bind(this);
    this.handleResetPlayer = this.handleResetPlayer.bind(this);
  }


  handleUpdatePlayer (id, username) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=150';

      return newState;
    });
  }


  handleResetPlayer (id) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;

      return newState;
    });
  }

  render () {
    // Pull some vars out of state for ease of coding/reading...
    var pOneName = this.state.playerOneName;
    var pTwoName = this.state.playerTwoName;
    var pOneImage = this.state.playerOneImage;
    var pTwoImage = this.state.playerTwoImage;

    var match = this.props.match;

    return (
      <div>
        <div className='row'>
          {!pOneName ?
            <PlayerInput 
              playerID='playerOne'
              label='Player One'
              onSubmit={this.handleUpdatePlayer}
            />
            : <PlayerPreview 
              avatar={pOneImage}
              playerID='playerOne'
              username={pOneName}
              onReset={this.handleResetPlayer}
            />
          }
          {!pTwoName ?
            <PlayerInput 
              playerID='playerTwo' 
              label='Player Two'
              onSubmit={this.handleUpdatePlayer}
            />
            : <PlayerPreview 
              avatar={pTwoImage}
              playerID='playerTwo'
              username={pTwoName}
              onReset={this.handleResetPlayer}
            />
          }
        </div>
        {pOneImage && pTwoImage &&
          <div>
            <Link
              className='button'
              to={{
                pathname: match.url + '/results',
                search: '?playerOneName=' + pOneName + '&playerTwoName=' + pTwoName,
              }}>
              {'Battle!'}
            </Link>
          </div>
        }
      </div>
    );    
  }
}


class PlayerInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange (event) {
    var updatedValue = event.target.value;

    this.setState(function () {
      return {
        username: updatedValue,
      };
    });
  }

  handleSubmit (event) {
    event.preventDefault();

    this.props.onSubmit(this.props.playerID, this.state.username);
  }

  render () {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label 
          htmlFor='username'>
          {this.props.label}
        </label>
        <input 
          id='username' 
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange} 
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
          {'Submit'}
        </button>
      </form>
    );
  }
}


function PlayerPreview (props) {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h2>
          {'@' + props.username}
        </h2>
        <button 
          className='reset'
          onClick={props.onReset.bind(null, props.playerID)}>
          {'Reset'}
        </button>
      </div>
    </div>
  );
}

PlayerInput.propTypes = {
  playerID: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  playerID: PropTypes.string.isRequired,
};

Battle.propTypes = {
  match: PropTypes.object.isRequired,
};

module.exports = Battle;