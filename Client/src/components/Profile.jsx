import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render () {
    return <div className="current-customer">
      <h2 style={{textAlign: 'center', fontFamily: 'verdana'}}>
        Welcome, {this.props.customer.get('name')}
      </h2>
    </div>;
  }
});
