import {Map, List, fromJS} from 'immutable';
export const INITIAL_STATE = new Map();

function getOrderById(state, orderId) {
  const orders = state.get('orders');
  if (orders) {
    for (var order of orders) {
      if (order.get('id') === orderId) {
        return order;
      }
    }
  }
  return null;
}

function getCustomerById(state, customerId) {
  const customers = state.get('customers');
  if (customers) {
    for (var customer of customers) {
      if (customer.get('id') === customerId) {
        return customer;
      }
    }
  }
  return null;
}

function updateOrderInCustomer(state, customer, orderId, like) {
  var key1 = like ? 'favorites' : 'rejections';
  var key2 = like ? 'rejections' : 'favorites';
  const updatedCustomer = customer.updateIn(
    [key1], new List(), list1 => list1.concat(orderId)
  ).updateIn(
    [key2], new List(), list2 => list2.splice(list2.indexOf(orderId), 1)
  );

  return state.updateIn(
    ['customers'], new List(), customers => customers.splice(customers.indexOf(customer), 1, updatedCustomer)
  );
}

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

export function setCustomers(state, customers) {
  return state.set('customers', fromJS(customers));
}

export function getCustomer(state, username) {
  const customers = state.get('customers');
  if (customers) {
    for (var customer of customers) {
      if (customer.get('username') === username) {
        return customer;
      }
    }
  }
  return null;
}

export function voteOrder(state, customerId, orderId, like) {
  const order = getOrderById(state, orderId);
  if (!order) {
    return state;
  }

  const customer = getCustomerById(state, customerId);
  if (!customer) {
    return state;
  }

  // Check for duplicates
  var key1 = like ? 'favorites' : 'rejections';
  const voteIds = customer.get(key1);
  if (voteIds && voteIds.indexOf(orderId) > -1) {
    return state;
  }

  const updatedCustomerState = updateOrderInCustomer(state, customer, orderId, like);
  return updateOrderPopularity(updatedCustomerState, orderId, like);
}
