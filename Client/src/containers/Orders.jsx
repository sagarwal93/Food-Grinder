import React from 'react';
import {connect} from 'react-redux';
import OrderList from './../components/OrderList'; //eslint-disable-line
import * as actionCreators from '../action_creators';
import Dialog from 'material-ui/lib/dialog'; //eslint-disable-line
import {Link} from 'react-router'; //eslint-disable-line

export const Orders = React.createClass({

  getInitialState() {
    return {
      orderCardOpen: true
    };
  },

  showNextOrder() {
    this.props.nextOrder();
  },

  render () {
    return (
      <div>
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
          <Link to='order'>
            <button style={{
              padding: '2%',
              backgroundColor: '#FF5722',
              color: '#fff',
              border: '0px',
              fontSize: '16px',
              width: '50%',
              margin: '1% 0 5% 0'
            }}
            onClick={this.showNextOrder}>
              Browse Orders
            </button>
          </Link>
        </div>
        {
          this.props.orders &&
          <div>
            <div style={{
              fontSize: '16px',
              fontFamily: 'verdana',
              margin: '2.5%',
              textAlign: 'center'
            }}>
              Your Favorites
            </div>
            <OrderList {...this.props} />
          </div>
        }
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    customer: state.get('customer'),
    orders: state.getIn(['customer', 'favoriteOrders']),
    currentOrder: state.get('currentOrder')
  };
}

export const OrdersContainer = connect(
  mapStateToProps, actionCreators
)(Orders);
