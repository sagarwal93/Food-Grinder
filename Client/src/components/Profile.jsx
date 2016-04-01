import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render () {
    return <div className="current-customer">
      <div>
        {this.props.customer.get('username')}
      </div>
      <div>
        {this.props.customer.get('name')}
      </div>
    </div>;
  }
});
