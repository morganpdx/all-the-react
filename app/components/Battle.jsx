var React = require('react');
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
  }


  handleUpdatePlayer () {
    this.setState(function () {
      
    });
  }

  render () {
    return (
      <div>Battle</div>
    );    
  }
}

function PlayerInput (props) {

}

module.exports = Battle;