import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ORDERS', () => {
    const initialState = Map();
    const action = {type: 'SET_ORDERS', orders: [{id:1, name:'Pizza'}, {id:2, name:'Salad'}]};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      orders: [{id:1, name:'Pizza'}, {id:2, name:'Salad'}]
    }));
  });

  it('handles SET_CUSTOMER', () => {
    const initialState = Map();
    const action = {type: 'SET_CUSTOMER', customer: {id:1, name:'Brian'}};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      customer: {id:1, name:'Brian'}
    }));
  });

  // it('handles NEXT', () => {
  //   const initialState = fromJS({
  //     entries: ['Trainspotting', '28 Days Later']
  //   });
  //   const action = {type: 'NEXT'};
  //   const nextState = reducer(initialState, action);
  //
  //   expect(nextState).to.equal(fromJS({
  //     vote: {
  //       pair: ['Trainspotting', '28 Days Later']
  //     },
  //     entries: []
  //   }));
  // });
  //
  // it('handles VOTE', () => {
  //   const initialState = fromJS({
  //     vote: {
  //       pair: ['Trainspotting', '28 Days Later']
  //     },
  //     entries: []
  //   });
  //   const action = {type: 'VOTE', entry: 'Trainspotting'};
  //   const nextState = reducer(initialState, action);
  //
  //   expect(nextState).to.equal(fromJS({
  //     vote: {
  //       pair: ['Trainspotting', '28 Days Later'],
  //       tally: {Trainspotting: 1}
  //     },
  //     entries: []
  //   }));
  // });

  it('has an initial state', () => {
    const action = {type: 'SET_ORDERS', orders: [{id:1, name:'Pizza'}, {id:2, name:'Salad'}]};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      orders: [{id:1, name:'Pizza'}, {id:2, name:'Salad'}]
    }));
  });

  it('can be used with reduce', () => {
      const actions = [
        {type: 'SET_ORDERS', orders: [{id:1, name:'Pizza'}, {id:2, name:'Salad'}]},
        // {type: 'NEXT'},
        // {type: 'VOTE', entry: 'Trainspotting'},
        // {type: 'VOTE', entry: '28 Days Later'},
        // {type: 'VOTE', entry: 'Trainspotting'},
        // {type: 'NEXT'}
      ];
      const finalState = actions.reduce(reducer, Map());

      expect(finalState).to.equal(fromJS({
        orders: [{id:1, name:'Pizza'}, {id:2, name:'Salad'}]
      }));
    });
});
