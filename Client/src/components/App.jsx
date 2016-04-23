import React from 'react';
import {ConnectionStateContainer} from './ConnectionState'; //eslint-disable-line
import Navigation from './Navigation'; //eslint-disable-line

export default React.createClass({
  render: function() {
    return <div>
      <Navigation />
      <div className="container" style={{margin: '15px 2.5%'}}>
        <ConnectionStateContainer />
        {this.props.children}
      </div>
    </div>;
  }
});
