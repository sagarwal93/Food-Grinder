import React from 'react';
import {ConnectionStateContainer} from './ConnectionState'; //eslint-disable-line
import Navigation from './Navigation'; //eslint-disable-line

export default React.createClass({
  render: function() {
    return <div>
      <Navigation />
      <ConnectionStateContainer />
      {this.props.children}
    </div>;
  }
});
