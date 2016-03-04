import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render () {
    const {order} = this.props;
    return <li className="order-list-item"
      onClick={this.props.setCurrentOrder.bind(this, order)}>
      {order.get('name')}
    </li>;
  }
});
