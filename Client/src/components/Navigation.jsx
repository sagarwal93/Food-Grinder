import React from 'react';
import {Link} from 'react-router'; //eslint-disable-line

const Navigation = React.createClass({
  render () {
    return (
      <header>
        <Link to='order'>Current Order</Link>
        <Link to='orders'>Favorites</Link>
      </header>
    );
  }
});


export default Navigation;
