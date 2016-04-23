import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import Profile from './../components/Profile'; //eslint-disable-line
import OrderList from './../components/OrderList'; //eslint-disable-line
import {hashHistory} from 'react-router';
import TextField from 'material-ui/lib/text-field'; //eslint-disable-line
import RaisedButton from 'material-ui/lib/raised-button'; //eslint-disable-line


export const Login = React.createClass({
  showCustomer() {
    // this.props.setCustomer();
    this.props.getCustomer('bsquared');
  },
  handleSubmit(event) {
    event.preventDefault();
    this.props.getCustomer(this.username);

    hashHistory.push('orders');
  },
  textFieldChange(event) {
    this.username = event.target.value;
  },
  render () {
    const {customer} = this.props;

    return (
      <div style={{
        textAlign: 'center'
      }}>
        {!customer &&
          <form onSubmit={this.handleSubmit}>
            <TextField
              floatingLabelText="Username"
              type="username"
              onChange={this.textFieldChange}
            />
            <br/>
            <RaisedButton label="Log In" onClick={this.handleSubmit} backgroundColor='#FF5722'labelColor='#FFFFFF'/>
          </form>
        }
      </div>
    );
  }
});

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
