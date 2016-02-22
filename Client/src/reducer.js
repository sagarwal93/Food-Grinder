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

function setCurrentOrder(state) {
  const orders = state.get('orders');
  if (orders && orders.count() >= 1) {
    return state.merge({
      currentOrder: orders.first(),
      orders: orders.skip(1)
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
    case 'SET_CURRENT_ORDER':
      return setCurrentOrder(state);
    case 'VOTE':
      return vote(state, action.entry);
    default:
      return state;
  }
}
