import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router'; //eslint-disable-line
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux'; //eslint-disable-line
import io from 'socket.io-client';
import reducer from './reducer';
import {setClientId, setState, setCustomer, setOrders, setConnectionState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import getClientId from './client_id';
import App from './components/App';
// import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';
import {OrdersContainer} from './containers/Orders';
import {OrderContainer} from './containers/Order';
import {LoginContainer} from './containers/Login';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state => {
  store.dispatch(setState(state)); //eslint-disable-line
});

socket.on('customer', customer => {
  store.dispatch(setCustomer(customer)); //eslint-disable-line
});

socket.on('orders', orders => {
  store.dispatch(setOrders(orders)); //eslint-disable-line
});

[
  'connect',
  'connect_error',
  'connect_timeout',
  'reconnect',
  'reconnecting',
  'reconnect_error',
  'reconnect_failed'
].forEach(ev =>
  socket.on(ev, () => store.dispatch(setConnectionState(ev, socket.connected))) //eslint-disable-line
);

const createStoreWithMiddleware =
  compose(
    applyMiddleware(remoteActionMiddleware(socket)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);
const store = createStoreWithMiddleware(reducer);
store.dispatch(setClientId(getClientId()));

const routes = <Route component={App}>
  <Route path="/" component={LoginContainer} />
  <Route path="/results" component={ResultsContainer} />
  <Route path="/orders" component={OrdersContainer} />
  <Route path="/order" component={OrderContainer} />
  <Route path="/login" component={LoginContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
