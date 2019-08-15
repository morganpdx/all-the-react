var React = require('react');
var NavLink = require('react-router-dom').NavLink;


// NavBar for the main app
function NavBar () {
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='nav-item-active' to='/'>
          {'Home'}
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='nav-item-active' to='/battle'>
          {'Battle'}
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='nav-item-active' to='/popular'>
          {'Popular'}
        </NavLink>
      </li>
    </ul>
  );
}

module.exports = NavBar;