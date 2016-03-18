import {setOrders, setCustomer, voteOrder, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ORDERS':
      return setOrders(state, action.orders);
    case 'SET_CUSTOMER':
      return setCustomer(state, action.customer);
    case 'FAVORITE_ORDER':
      return voteOrder(state, action.customerId, action.orderId, true);
    case 'REJECT_ORDER':
      return voteOrder(state, action.customerId, action.orderId, false);
    default:
      return state;
    // case 'NEXT':
    //   return next(state);
    // case 'VOTE':
    //   return state.update('vote', voteState => vote(voteState, action.entry));
  }
}
