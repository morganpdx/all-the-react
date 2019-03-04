var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

var Nav = require('./Nav.jsx');
var Home = require('./Home.jsx');
var Battle = require('./Battle.jsx');
var Popular = require('./Popular.jsx');



class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='main-container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/popular' component={Popular} />
            <Route render={function () {
              return (<p>{'Your Search has Come Up Empty (404)'}</p>);
            }} />
          </Switch>
        </div>
      </Router>
    );
  }
}

module.exports = App;