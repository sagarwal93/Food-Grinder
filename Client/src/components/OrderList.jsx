import React from 'react';
import OrderListItem from './OrderListItem'; //eslint-disable-line
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render () {
    const {orders} = this.props;
    return (
      <div className='row'>
        {
          orders.map(order => {
            return <OrderListItem key={order.get('id')} order={order} setCurrentOrder={this.props.setCurrentOrder}/>;
          })
        }
      </div>
    );

  }
});
