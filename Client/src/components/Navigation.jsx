import React from 'react';
import {Link} from 'react-router'; //eslint-disable-line

const Navigation = React.createClass({
  render () {
    return (
      <nav className="deep-orange" role="navigation">
        <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">Chewsier</a>
          <ul className="right hide-on-med-and-down">
            <li><Link to='order'>Current Order</Link></li>
            <li><Link to='orders'>Favorites</Link></li>
            <li><Link to='login'>Login</Link></li>
          </ul>

          <ul id="nav-mobile" className="side-nav">
            <li><a href="#">Navbar Link</a></li>
          </ul>
          <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
        </div>
      </nav>
    );
  }
});

export default Navigation;
