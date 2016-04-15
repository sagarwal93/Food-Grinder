import makeStore from './src/store';
import {startServer} from './src/server';
import {esclient, buildChewsierOrders} from './src/esclient'; //eslint-disable-line
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

// esclient.search({
//   index: 'chewsier',
//   type: 'orders'
// }).then(
//   function(resp) {
//     let esorders = resp.hits.hits;
//     store.dispatch({
//       type: 'SET_ORDERS',
//       orders: buildChewsierOrders(esorders)
//     });
//   },
//   function(err) {
//     console.log(err); //eslint-disable-line
//   }
// );
