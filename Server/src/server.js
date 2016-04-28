import Server from 'socket.io';
import fetch from './fetcher';

export function startServer(store) {
  const io = new Server().attach(443);

  // store.subscribe(
  //   () => {
  //     io.emit('state', store.getState().toJS());
  //   }
  // );

  io.on('connection', (socket) => {
    // socket.emit('state', store.getState().toJS());
    socket.emit('orders', store.getState().get('orders').toJS());

    socket.on('action', () => {
      store.dispatch.bind(store);
    });

    socket.on('fetch', (data) => {
      const retVal = fetch(store.getState(), data);
      switch (data.type) {
        case 'GET_CUSTOMER':
          io.emit('customer', retVal.toJS());
          break;
        case 'GET_ORDERS':
          io.emit('orders', retVal.toJS());
          break;
        default:
          io.emit('fail', retVal.toJS());
          break;
      }
    });
  });
}
