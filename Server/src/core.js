import {Map, List, fromJS} from 'immutable';
export const INITIAL_STATE = new Map();

function updateOrderPopularity(state, orderId, like) {
  var increment = like ? 1 : -1;
  const orders = state.get('orders');
  // FIX THIS - NOT EFFICIENT
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
  return state.merge({
    orders: updatedOrders
  });
}

export function setOrders(state, orders) {
  return state.set('orders', fromJS(orders));
}

export function setCustomer(state, customer) {
  return state.set('customer', fromJS(customer));
}

export function voteOrder(state, customerId, orderId, like) {
  // Ignore nonexistent customer
  const customer = state.get('customer');
  if (!customer || customer.get('id') !== customerId) {
    return state;
  }

  // Check for duplicates
  var key1 = like ? 'favorites' : 'rejections';
  const voteIds = state.get('customer').get(key1);
  if (voteIds && voteIds.indexOf(orderId) > -1) {
    return state;
  }

  var key2 = like ? 'rejections' : 'favorites';
  const updatedCustomerState = state.updateIn(
    ['customer', key1], new List(), list1 => list1.concat(orderId)
  ).updateIn(
    ['customer', key2], new List(), list2 => list2.splice(list2.indexOf(orderId), 1)
  );
  return updateOrderPopularity(updatedCustomerState, orderId, like);
}
