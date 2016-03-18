import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ORDERS', () => {
    const initialState = new Map();
    const action = {type: 'SET_ORDERS', orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}]};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}]
    }));
  });

  it('handles SET_CUSTOMERS', () => {
    const initialState = new Map();
    const action = {type: 'SET_CUSTOMERS', customers: [{id: 1, name: 'Brian'}, {id: 2, name: 'Les'}]};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      customers: [{id: 1, name: 'Brian'}, {id: 2, name: 'Les'}]
    }));
  });

  it('handles FAVORITE_ORDER', () => {
    const initialState = fromJS({
      orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}, {id: 3, name: 'Cake'}],
      customers: [{id: 1, name: 'Brian'}]
    });
    const action = {type: 'FAVORITE_ORDER', customerId: 1, orderId: 2};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad', popularity: 1}, {id: 3, name: 'Cake'}],
      customers: [{id: 1, name: 'Brian', favorites: [2]}]
    }));
  });

  it('handles REJECT_ORDER', () => {
    const initialState = fromJS({
      orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}, {id: 3, name: 'Cake'}],
      customers: [{id: 1, name: 'Brian'}]
    });
    const action = {type: 'REJECT_ORDER', customerId: 1, orderId: 2};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad', popularity: -1}, {id: 3, name: 'Cake'}],
      customers: [{id: 1, name: 'Brian', rejections: [2]}]
    }));
  });

  it('has an initial state', () => {
    const action = {type: 'SET_ORDERS', orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}]};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}]
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
        {type: 'SET_ORDERS', orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}]},
        {type: 'SET_CUSTOMERS', customers: [{id: 1, name: 'Brian'}, {id: 2, name: 'Les'}]},
        {type: 'FAVORITE_ORDER', customerId: 1, orderId: 2}
    ];
    const finalState = actions.reduce(reducer, new Map());

    expect(finalState).to.equal(fromJS({
      orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad', popularity: 1}],
      customers: [{id: 1, name: 'Brian', favorites: [2]}, {id: 2, name: 'Les'}]
    }));
  });
});
