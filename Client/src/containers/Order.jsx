import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import * as actionCreators from '../action_creators';
import OrderCurrent from './../components/OrderCurrent'; //eslint-disable-line

export const Order = React.createClass({
  componentDidMount() {
    const {customer} = this.props;
    if (!customer) {
      hashHistory.push('login');
    }
  },

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
          <div style={{
            fontSize: '24px',
            fontFamily: 'Roboto, sans-serif',
            marginTop: '50px',
            textAlign: 'center'
          }}>
            Thank you for participating in our demo!
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
