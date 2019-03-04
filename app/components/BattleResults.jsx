var React = require('react');

// Calculate and display battle results
class BattleResults extends React.Component {
  render () {
    console.log(this.props);
    return (
      <div className=''>
        {'Here are your results!!'}
      </div>
    );
  }
}

module.exports = BattleResults;