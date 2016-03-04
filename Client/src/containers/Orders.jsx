import React from 'react';
import {connect} from 'react-redux';
import OrderCurrent from './../components/OrderCurrent'; //eslint-disable-line
import OrderList from './../components/OrderList'; //eslint-disable-line
import * as actionCreators from '../action_creators';

export const Orders = React.createClass({
  render () {
    return (
      <div>
        <OrderList {...this.props} />
        <OrderCurrent currentOrder={this.props.currentOrder} />
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    orders: state.getIn(['orders']),
    currentOrder: state.get('currentOrder')
  };
}

export const OrdersContainer = connect(
  mapStateToProps, actionCreators
)(Orders);
