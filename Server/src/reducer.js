import {setOrders, setCustomers, voteOrder, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ORDERS':
      return setOrders(state, action.orders);
    case 'SET_CUSTOMERS':
      return setCustomers(state, action.customers);
    case 'FAVORITE_ORDER':
      return voteOrder(state, action.customerId, action.orderId, true);
    case 'REJECT_ORDER':
      return voteOrder(state, action.customerId, action.orderId, false);
    default:
      return state;
  }
}
