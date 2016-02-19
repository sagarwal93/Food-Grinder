import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../action_creators';

export const Orders = React.createClass({
  render () {
    const {orders} = this.props;
    //console.log(JSON.stringify(orders));
    return orders ?
      <div>
        {
          orders.map((order) => {
            const currOrder = order.toJS();
            return <div key={currOrder.id}>
                <span>
                  {currOrder.name}
                </span>
              </div>;
          })
        }
      </div>
      :
      <div> Nothing here! </div>;
  }
});

function mapStateToProps(state) {
  return {
    orders: state.getIn(['orders'])
  };
}

export const OrdersContainer = connect(
  mapStateToProps, actionCreators
)(Orders);
