import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_CLIENT_ID', () => {
    const initialState = Map();
    const action = {
      type: 'SET_CLIENT_ID',
      clientId: '1234'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      clientId: '1234'
    }));
  });

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        orders: List.of(
          Map({
            id: 1,
            name: 'Pi'
          }),
          Map({
            id: 2,
            name: 'Sal'
          })
        )
      })
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      orders: [
        {id: 1, name: 'Pi'},
        {id: 2, name: 'Sal'}
      ]
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        orders: [
          {id: 1, name: 'Pi'},
          {id: 2, name: 'Sal'}
        ]
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      orders: [
        {id: 1, name: 'Pi'},
        {id: 2, name: 'Sal'}
      ]
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        orders: [
          {id: 1, name: 'Pi'},
          {id: 2, name: 'Sal'}
        ]
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      orders: [
        {id: 1, name: 'Pi'},
        {id: 2, name: 'Sal'}
      ]
    }));
  });

  it('handles SET_STATE with initial state', () => {
    const initialState = fromJS({
      orders: [
        {id: 1, name: 'Pizza'}
      ]
    });

    const action = {
      type: 'SET_STATE',
      state: {
        orders: [
          {id: 2, name: 'Salad'}
        ]
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      orders: [
        {id: 2, name: 'Salad'}
      ]
    }));
  });

  //
  // it('handles VOTE by setting myVote', () => {
  //   const state = fromJS({
  //     vote: {
  //       round: 42,
  //       pair: ['Trainspotting', '28 Days Later'],
  //       tally: {Trainspotting: 1}
  //     }
  //   });
  //   const action = {type: 'VOTE', entry: 'Trainspotting'};
  //   const nextState = reducer(state, action);
  //
  //   expect(nextState).to.equal(fromJS({
  //     vote: {
  //       round: 42,
  //       pair: ['Trainspotting', '28 Days Later'],
  //       tally: {Trainspotting: 1}
  //     },
  //     myVote: {
  //       round: 42,
  //       entry: 'Trainspotting'
  //     }
  //   }));
  // });
  //
  // it('does not set myVote for VOTE on invalid entry', () => {
  //   const state = fromJS({
  //     vote: {
  //       round: 42,
  //       pair: ['Trainspotting', '28 Days Later'],
  //       tally: {Trainspotting: 1}
  //     }
  //   });
  //   const action = {type: 'VOTE', entry: 'Sunshine'};
  //   const nextState = reducer(state, action);
  //
  //   expect(nextState).to.equal(fromJS({
  //     vote: {
  //       round: 42,
  //       pair: ['Trainspotting', '28 Days Later'],
  //       tally: {Trainspotting: 1}
  //     }
  //   }));
  // });
});
