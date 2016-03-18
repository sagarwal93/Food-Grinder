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
          <OrderCurrent currentOrder={order}
            showNextOrder={this.showNextOrder}/>
          :
          <div>
            No order exists
          </div>
        }
        <button onClick={() => this.showNextOrder()}>
          Get Next Order
        </button>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    currentOrder: state.get('currentOrder')
  };
}

export const OrderContainer =
  connect(mapStateToProps, actionCreators)(Order);
