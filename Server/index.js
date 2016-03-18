import makeStore from './src/store';
import {startServer} from './src/server';

export const store = makeStore();
startServer(store);

store.dispatch({
  type: 'SET_ORDERS',
  orders: require('./orders.json')
});

store.dispatch({
  type: 'SET_CUSTOMERS',
  customers: require('./customers.json')
});
