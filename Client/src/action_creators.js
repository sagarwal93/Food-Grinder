export function setClientId(clientId) {
  return {
    type: 'SET_CLIENT_ID',
    clientId
  };
}

export function setConnectionState(state, connected) {
  return {
    type: 'SET_CONNECTION_STATE',
    state,
    connected
  };
}

export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function nextOrder() {
  return {
    type: 'NEXT_ORDER'
  };
}

export function setCurrentOrder(order) {
  return {
    type: 'SET_CURRENT_ORDER',
    order: order
  };
}

export function setCustomer(customer) {
  return {
    type: 'SET_CUSTOMER',
    customer: customer
  };
}

export function setOrders(orders) {
  return {
    type: 'SET_ORDERS',
    orders: orders
  };
}

export function vote(entry) {
  return {
    meta: {remote: true},
    type: 'VOTE',
    entry
  };
}

export function next() {
  return {
    meta: {remote: true},
    type: 'NEXT'
  };
}

export function restart() {
  return {
    meta: {remote: true},
    type: 'RESTART'
  };
}

export function favoriteOrderForCustomer(order) {
  return {
    type: 'FAVORITE_ORDER',
    order
  };
}

export function getCustomer(username) {
  return {
    type: 'SET_CUSTOMER',
    customer: {id: 1001, username: username, name: username, favorites: [2]}
  };
}
