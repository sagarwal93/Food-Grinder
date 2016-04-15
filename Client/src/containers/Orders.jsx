import React from 'react';
import {connect} from 'react-redux';
import OrderCurrent from './../components/OrderCurrent'; //eslint-disable-line
import OrderList from './../components/OrderList'; //eslint-disable-line
import * as actionCreators from '../action_creators';

export const Orders = React.createClass({
  render () {
    return (
      <div style={{
        textAlign: 'center'
      }}>
        {
          this.props.customer && <div style={{
            fontSize: '24px',
            fontFamily: 'verdana',
            margin: '2.5%'
          }}>
            Welcome, {this.props.customer.get('name')}
          </div>
        }
        <button style={{
          padding: '2%',
          backgroundColor: '#FF5722',
          color: '#fff',
          border: '0px',
          fontSize: '16px',
          width: '50%',
          margin: '1% 0 5% 0'
        }}>
          Browse Orders
        </button>
        <div style={{
          fontSize: '16px',
          fontFamily: 'verdana',
          margin: '2.5%'
        }}>
          Your Favorites
        </div>
        <OrderList {...this.props} />
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    customer: state.get('customer'),
    orders: state.getIn(['orders'])
  };
}

export const OrdersContainer = connect(
  mapStateToProps, actionCreators
)(Orders);
