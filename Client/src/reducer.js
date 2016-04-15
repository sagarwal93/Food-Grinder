import {Map} from 'immutable';
import {defaultState} from './default_state';

function setConnectionState(state, connectionState, connected) {
  return state.set('connection', new Map({
    state: connectionState,
    connected
  }));
}

function setState(state, newState) {
  return state.merge(newState);
}

function vote(state, entry) {
  const currentRound = state.getIn(['vote', 'round']);
  const currentPair = state.getIn(['vote', 'pair']);
  if (currentPair && currentPair.includes(entry)) {
    return state.set('myVote', new Map({
      round: currentRound,
      entry
    }));
  }
  return state;
}

// function resetVote(state) {
//   const votedForRound = state.getIn(['myVote', 'round']);
//   const currentRound = state.getIn(['vote', 'round']);
//   if (votedForRound !== currentRound) {
//     return state.remove('myVote');
//   }
//   return state;
// }

function favoriteOrderForCustomer(state, order) {

  const favs = state.getIn(['customer', 'favorites']);
  for (let i = 0; i < favs.size; i++) {
    if (favs.get(i) === order.get('id')) {
      return state;
    }
  }

  const addToFavorites = state.updateIn(['customer', 'favoriteOrders'], list => {
    return list.push(order);
  });

  return addToFavorites.updateIn(['customer', 'favorites'], list => {
    return list.push(order.get('id'));
  });
}

function nextOrder(state) {
  const orders = state.get('orders');
  if (orders && orders.count() >= 1) {
    return state.merge({
      currentOrder: orders.first(),
      orders: orders.skip(1)
    });
  }
  return state;
}

function setCurrentOrder(state, order) {
  if (order) {
    return state.merge({
      currentOrder: order
    });
  }
  return state;
}

function setCustomer(state, customer) {
  console.log(customer); //eslint-disable-line
  if (customer) {
    const orders = state.get('orders').toJS();
    const favoriteOrders = orders.filter(x => customer.favorites.indexOf(x.id) >= 0);
    // console.log(favoriteOrders); //eslint-disable-line
    customer.favoriteOrders = favoriteOrders;
    // console.log(customer); //eslint-disable-line
    return state.merge({
      customer
    });
  }
  return state;
}

function setOrders(state, orders) {
  console.log(orders); //eslint-disable-line
  if (orders) {
    return state.merge({
      orders
    });
  }
  return state;
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'SET_CLIENT_ID':
      return state.set('clientId', action.clientId);
    case 'SET_CONNECTION_STATE':
      return setConnectionState(state, action.state, action.connected);
    case 'SET_STATE':
      return setState(state, action.state);
    case 'FAVORITE_ORDER':
      return favoriteOrderForCustomer(state, action.order);
    case 'NEXT_ORDER':
      return nextOrder(state);
    case 'SET_CURRENT_ORDER':
      return setCurrentOrder(state, action.order);
    case 'SET_CUSTOMER':
      return setCustomer(state, action.customer);
    case 'SET_ORDERS':
      return setOrders(state, action.orders);
    case 'VOTE':
      return vote(state, action.entry);
    default:
      return state;
  }
}
