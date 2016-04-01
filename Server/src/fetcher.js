import {getCustomer, getOrders, INITIAL_STATE} from './core';

export default function(state = INITIAL_STATE, fetch) {
  switch (fetch.type) {
    case 'GET_CUSTOMER':
      return getCustomer(state, fetch.username);
    case 'GET_ORDERS':
      return getOrders(state, fetch.username);
    default:
      return {message: 'Failed to process request.'};
  }
}
