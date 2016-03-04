import {Map, List, fromJS} from 'immutable';
export const INITIAL_STATE = new Map();

export function setOrders(state, orders) {
  return state.set('orders', fromJS(orders));
}

export function setCustomer(state, customer) {
  return state.set('customer', fromJS(customer));
}

// function getWinners(vote) {
//   if (!vote) return [];
//   const [a, b] = vote.get('pair');
//   const aVotes = vote.getIn(['tally', a], 0);
//   const bVotes = vote.getIn(['tally', b], 0);
//   if (aVotes > bVotes)
//   	return [a];
//   else if (aVotes < bVotes)
//   	return [b];
//   else
//   	return [a, b];
// }
//
// export function next(state) {
//   const entries = state.get('entries')
//   	.concat(getWinners(state.get('vote')));
// 	if(entries.size === 1) {
// 		return state.remove('vote')
// 					.remove('entries')
// 					.set('winner', entries.first());
// 	} else {
// 	  return state.merge({
// 	    vote: Map({pair: entries.take(2)}),
// 	    entries: entries.skip(2)
// 	  });
// 	}
// }
//
export function favoriteOrder(state, customerId, orderId) {
  const nextState = state.updateIn(
    ['customer', 'favorites'], new List(), favorites => favorites.concat(orderId)
  );

  const orders = state.get('orders');
  if (orders.size === 0) {
    return nextState;
  }

// FIX THIS - NOT EFFICIENT
  const updatedOrders = orders.map(
    order => {
      if (order.get('id') === orderId) {
        return order.updateIn(
          ['popularity'], 0, popularity => popularity + 1
        );
      }
      return order;
    }
  );

  return nextState.merge({
    orders: updatedOrders
  });
}
