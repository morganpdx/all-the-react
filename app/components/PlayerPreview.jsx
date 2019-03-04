var React = require('react');
var PropTypes = require('prop-types');


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


PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  playerID: PropTypes.string.isRequired,
};

module.exports = PlayerPreview;