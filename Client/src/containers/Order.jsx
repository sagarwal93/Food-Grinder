import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import OrderCurrent from './../components/OrderCurrent'; //eslint-disable-line

export const Order = React.createClass({

  showNextOrder() {
    this.props.nextOrder();
  },

  render () {
    const order = this.props.currentOrder;
    return (
      <div>
        {
          order.size ?
          <OrderCurrent showNextOrder={this.showNextOrder}
            {...this.props}/>
          :
          <div>
            No order exists
          </div>
        }
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    currentOrder: state.get('currentOrder'),
    orders: state.get('orders'),
    customer: state.get('customer')
  };
}

export const OrderContainer =
  connect(mapStateToProps, actionCreators)(Order);
