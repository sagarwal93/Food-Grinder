import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render () {
    const {order} = this.props;
    return <li onClick={this.props.setCurrentOrder}>{order.get('name')}</li>;
  }
});
