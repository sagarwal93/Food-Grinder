import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
export const Orders = React.createClass({
  render () {
    return (

    )
  };
})

function mapStateToProps(state) {
  return {
    orders: state.get('orders');
  }
}

export const OrderContainer = connect(
  mapStateToProps
)(Orders);
