var React = require('react');
var PropTypes = require('prop-types');

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
  }


  handleUpdatePlayer (id, username) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=150';

      return newState;
    });
  }

  render () {
    return (
      <div>
        <div className='row'>
          {!this.state.playerOneName &&
            <PlayerInput 
              playerID='playerOne'
              label='Player One'
              onSubmit={this.handleUpdatePlayer}
            />
          }
          {!this.state.playerTwoName &&
            <PlayerInput 
              playerID='playerTwo' 
              label='Player Two'
              onSubmit={this.handleUpdatePlayer}
            />
          }
        </div>
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

module.exports = Battle;