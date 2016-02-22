import React from 'react';
import OrderListItem from './OrderListItem'; //eslint-disable-line
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render () {
    const {orders} = this.props;
    // console.log(JSON.stringify(orders)); //eslint-disable-line
    return (
      <ul>
        {
          orders.map(order => {
            // console.log(order); //eslint-disable-line
            return <OrderListItem key={order.get('id')} order={order} setCurrentOrder={this.props.setCurrentOrder}/>;
          })
        }
      </ul>
    );

  }
});
