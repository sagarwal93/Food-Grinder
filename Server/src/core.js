import {Map, List, fromJS} from 'immutable';
export const INITIAL_STATE = new Map();

export function setOrders(state, orders) {
  return state.set('orders', fromJS(orders));
}

export function setCustomer(state, customer) {
  return state.set('customer', fromJS(customer));
}

export function voteOrder(state, customerId, orderId, like) {
  // Ignore nonexistent customer
  const customer = state.get('customer');
  if (!customer) {
    return state;
  }
  if (customer.get('id') !== customerId) {
    return state;
  }

  // Remove from customer if order is nonexistent
  const orders = state.get('orders');
  if (!orders) {
    return state.updateIn(
      ['customer', 'favorites'], new List(), favorites => favorites.remove(orderId)
    ).updateIn(
      ['customer', 'rejections'], new List(), rejections => rejections.remove(orderId)
    );
  }

  var key = like ? 'favorites' : 'rejections';
  const voteIds = customer.get(like);
  if (voteIds) {
    for (var voteId of voteIds) {
      if (voteId === orderId) {
        return state;
      }
    }
  }

  const nextState = state.updateIn(
    ['customer', key], new List(), list => list.concat(orderId)
  );

// FIX THIS - NOT EFFICIENT
  var increment = like ? 1 : -1;
  const updatedOrders = orders.map(
    order => {
      if (order.get('id') === orderId) {
        return order.updateIn(
          ['popularity'], 0, popularity => popularity + increment
        );
      }
      return order;
    }
  );

  return nextState.merge({
    orders: updatedOrders
  });
}
