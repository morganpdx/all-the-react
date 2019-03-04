var React = require('react');
var PropTypes = require('prop-types');


function ReposGrid (props) {
  return (
    <ul className='popular-repos-list'>
      {props.repos.map(function (repo, index) {
        return (
          <li key={index} className='popular-list-item'>
            <div className='popular-list-item_rank'>{'#'}{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>{'@' + repo.owner.login}</li>
              <li>{repo.stargazers_count + ' stars'}</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}


function Badge (props) {
  return (
    <div>
      <Avatar img={props.repo.img} />
      <Label name={props.repo.name} />
      <ScreenName username={props.repo.username} />
    </div>
  );
}

function Avatar (props) {
  return (
    <img src={props.img} />
  );
}

function Label (props) {
  return (
    <h1>{'Name:'} {props.name}</h1>
  );
}

function ScreenName (props) {
  return (
    <h3>{'Username:'}  {props.username}</h3>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

Badge.propTypes = {
  repo: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  })).isRequired,
};

Avatar.propTypes = {
  img: PropTypes.string.isRequired,
};

Label.propTypes = {
  name: PropTypes.string.isRequired,
};

ScreenName.propTypes = {
  username: PropTypes.string.isRequired,
};

module.exports = ReposGrid;