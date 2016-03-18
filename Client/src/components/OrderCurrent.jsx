import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  favoriteOrder() {
    // const customerId = this.props.customer.get('id');
    const customerId = 1;
    const orderId = this.props.currentOrder.get('id');

    this.props.favoriteOrderForCustomer(orderId, customerId);
    this.props.showNextOrder();
  },
  rejectOrder() {
    this.props.showNextOrder();
  },
  render () {
    return <div className="current-order">
      <div>
        {this.props.currentOrder.get('name')}
      </div>
      <div>
        {this.props.currentOrder.get('description')}
      </div>
      <div>
        {this.props.currentOrder.get('price')}
      </div>
      <div>
        <button onClick={this.rejectOrder}>Reject</button>
        <button onClick={this.favoriteOrder}>Favorite</button>
      </div>
      <button>Order Now</button>
    </div>;
  }
});
