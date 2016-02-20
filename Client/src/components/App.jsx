import React from 'react';
import {ConnectionStateContainer} from './ConnectionState'; //eslint-disable-line

export default React.createClass({
  render: function() {
    return <div>
      <ConnectionStateContainer />
      {this.props.children}
    </div>;
  }
});
