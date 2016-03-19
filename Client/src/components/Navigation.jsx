import React from 'react';
import {Link} from 'react-router'; //eslint-disable-line

const Navigation = React.createClass({
  render () {
    return (
      <header>
        <ul>
          <li><Link to='order'>Current Order</Link></li>
          <li><Link to='orders'>Favorites</Link></li>
          <li><Link to='login'>Login</Link></li>
        </ul>
      </header>
    );
  }
});


export default Navigation;
