import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import Profile from './../components/Profile'; //eslint-disable-line
import OrderList from './../components/OrderList'; //eslint-disable-line
import {hashHistory} from 'react-router';

export const Login = React.createClass({
  showCustomer() {
    // this.props.setCustomer();
    this.props.getCustomer('bsquared');
  },
  handleSubmit(event) {
    event.preventDefault();
    const input = this.refs.username;
    this.props.getCustomer(input.value);

    hashHistory.push('orders');
  },
  render () {
    const {customer} = this.props;

    return (
      <div style={{
        textAlign: 'center'
      }}>
        <div style={{
          margin: '2.5% 0'
        }}>
          Log in
        </div>
        {!customer &&
          <div>
            <form className="login-form form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
              </div>
              <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
              </button>
            </form>
          </div>
        }
      </div>
    );
  }
});

// {customer &&
//   <div>
//   <Profile customer={customer}/>
//   <OrderList {...this.props} />
//   </div>
// }

function mapStateToProps(state) {
  const customer = state.get('customer');
  const orders = customer ? customer.get('favoriteOrders') : [];
  return {
    customer: customer,
    orders: orders
  };
}

export const LoginContainer =
  connect(mapStateToProps, actionCreators)(Login);
