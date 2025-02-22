import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {

  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(new Map());

    store.dispatch({
      type: 'SET_ORDERS',
      orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}]
    });
    expect(store.getState()).to.equal(fromJS({
      orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}]
    }));

    store.dispatch({
      type: 'SET_CUSTOMERS',
      customers: [{id: 1, username: 'bsquared', name: 'Brian', favorites: [1, 2]}]
    });

    expect(store.getState()).to.equal(fromJS({
      orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}],
      customers: [{id: 1, username: 'bsquared', name: 'Brian', favorites: [1, 2]}]
    }));
  });

});
