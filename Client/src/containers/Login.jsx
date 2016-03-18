import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import Profile from './../components/Profile'; //eslint-disable-line

export const Login = React.createClass({
  showCustomer() {
    this.props.setCustomer();
  },

  render () {
    const {customer} = this.props;

    return (
      <div>
        {
          customer ?
          <Profile customer={customer}/>
          :
          <div>
            Login to see your account.
          </div>
        }
        <button onClick={() => this.showCustomer()}>
          Login
        </button>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    customer: state.get('customer')
  };
}

export const LoginContainer =
  connect(mapStateToProps, actionCreators)(Login);
