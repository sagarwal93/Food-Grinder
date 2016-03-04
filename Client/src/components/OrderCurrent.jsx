import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render () {
    return <div className="current-order">
      <div>
        {this.props.currentOrder.get('name')}
      </div>
      <div>
        {this.props.currentOrder.get('description')}
      </div>
    </div>;
  }
});
