import React from 'react';
import {connect} from 'react-redux';
import OrderList from './../components/OrderList'; //eslint-disable-line
import * as actionCreators from '../action_creators';
import {Link, hashHistory} from 'react-router'; //eslint-disable-line
import RaisedButton from 'material-ui/lib/raised-button'; //eslint-disable-line

export const Orders = React.createClass({
  componentDidMount() {
    const {customer} = this.props;
    if (!customer) {
      hashHistory.push('login');
    }
  },
  getInitialState() {
    return {
      orderCardOpen: true
    };
  },

  showNextOrder() {
    if (this.props.currentOrder.size === 0) {
      this.props.nextOrder();
    }
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
              fontFamily: 'Roboto, sans-serif',
              margin: '2.5%'
            }}>
              Welcome, {this.props.customer.get('name')}
            </div>
          }
          <Link to='order'>
            <RaisedButton label='Find Meals!'
              onClick={this.showNextOrder}
              backgroundColor='#FF5722'
              labelColor='#fff'/>
          </Link>
        </div>
        {
          this.props.orders &&
          <div>
            <div style={{
              fontSize: '16px',
              fontFamily: 'Roboto, sans-serif',
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
