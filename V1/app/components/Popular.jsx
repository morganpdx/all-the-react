var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

var ReposGrid = require('../components/ReposGrid.jsx');
var Loading = require('../components/Loading.jsx');

// Parent component for 'Popular' page
class Popular extends React.Component {
 
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage : 'All',
      repos : null,
    };

    this.handleUpdateLanguage = this.handleUpdateLanguage.bind(this);
  }


  componentDidMount () {
    // Update the 'repos' state component on initial mount
    api.fetchPopularRepos(this.state.selectedLanguage)
      .then(function (repos) {
        this.setState(function () {
          return {
            repos,
          };
        });
      }.bind(this));
  }

  // Called any time a language item is selected
  handleUpdateLanguage(lang) {
    // update the state with the selected language and clear out the repos array
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null,
      };
    });

    // Update the 'repos' array with the list of repos from Github for the selected language
    api.fetchPopularRepos(lang)
      .then(function (repos) {
        this.setState(function () {
          return {
            repos,
          };
        });
      }.bind(this));
  }

  render () {
    return (
      <div>
        <SelectLanguage 
          onSelect={this.handleUpdateLanguage}
          selectedLanguage={this.state.selectedLanguage}
        />
        { !this.state.repos 
          ? <Loading text={'Loading Repos'} speed={350} />
          : <ReposGrid repos={this.state.repos} />
        }
      </div>
    );
  }
}

// Child component for the language selector
function SelectLanguage (props) {
  var languages = ['All', 'CSS', 'Java', 'Javascript', 'Python', 'Ruby', 'Scala'];
  return (
    <ul className='popular-languages'>
      {languages.map(function (lang) {
        return (
          <LanguageItem 
            key={lang}
            language={lang} 
            onSelect={props.onSelect}
            selectedLanguage={props.selectedLanguage}
          />
        );
      })}
    </ul>
  );
}

// Child component for a single language item in the language selector
function LanguageItem(props) {
  return (
    <li
      className={props.language === props.selectedLanguage ? 'popular-languages-selected' : null}
      key={props.language} 
      onClick={props.onSelect.bind(null, props.language)}>
      {props.language}
    </li>
  );
}


SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};

LanguageItem.propTypes = {
  language: PropTypes.string.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};


module.exports = Popular;