import React from 'react';
import {ConnectionStateContainer} from './ConnectionState'; //eslint-disable-line
import ToolBar from './ToolBar'; //eslint-disable-line

export default React.createClass({
  render: function() {
    return <div>
      <ToolBar />
      <ConnectionStateContainer />
      {this.props.children}
    </div>;
  }
});
