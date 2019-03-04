var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

var PlayerPreview = require('../components/PlayerPreview.jsx');


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
              username={pOneName}>
              <button 
                className='reset'
                onClick={this.handleResetPlayer.bind(null, 'playerOne')}>
                {'Reset'}
              </button>
            </PlayerPreview>
          }
          {!pTwoName ?
            <PlayerInput 
              playerID='playerTwo' 
              label='Player Two'
              onSubmit={this.handleUpdatePlayer}
            />
            : <PlayerPreview 
              avatar={pTwoImage}
              username={pTwoName}>
              <button 
                className='reset'
                onClick={this.handleResetPlayer.bind(null, 'playerTwo')}>
                {'Reset'}
              </button>
            </PlayerPreview>
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


PlayerInput.propTypes = {
  playerID: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};


Battle.propTypes = {
  match: PropTypes.object.isRequired,
};

module.exports = Battle;