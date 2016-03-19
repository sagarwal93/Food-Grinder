import objectAssign from 'object-assign';

export default socket => store => next => action => {
  if (action.meta) {
    const clientId = store.getState().get('clientId');
    if (action.meta.remote) {
      socket.emit('action', objectAssign({}, action, {clientId}));
    }
    if (action.meta.fetch) {
      socket.emit('fetch', objectAssign({}, action, {clientId}));
    }
  }
  return next(action);
};
