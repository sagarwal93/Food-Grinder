import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_CLIENT_ID', () => {
    const initialState = new Map();
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
    const initialState = new Map();
    const action = {
      type: 'SET_STATE',
      state: fromJS({
        orders: [
          {id: 1, name: 'Pizza'},
          {id: 2, name: 'Salad'}
        ]
      })
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      orders: [
        {id: 1, name: 'Pizza'},
        {id: 2, name: 'Salad'}
      ]
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = new Map();
    const action = {
      type: 'SET_STATE',
      state: {
        orders: [
          {id: 1, name: 'Pizza'},
          {id: 2, name: 'Salad'}
        ]
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      orders: [
        {id: 1, name: 'Pizza'},
        {id: 2, name: 'Salad'}
      ]
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        orders: [
          {id: 1, name: 'Pizza'},
          {id: 2, name: 'Salad'}
        ]
      }
    };
    const nextState = reducer(undefined, action); //eslint-disable-line

    expect(nextState).to.equal(fromJS({
      orders: [
        {id: 1, name: 'Pizza'},
        {id: 2, name: 'Salad'}
      ],
      currentOrder: {id: 0, name: 'The Default Current Order'}
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

  it('handles NEXT_ORDER', () => {
    const initialState = fromJS({
      orders: [
        {id: 1, name: 'Pizza'},
        {id: 2, name: 'Salad'}
      ]
    });
    const action = {
      type: 'NEXT_ORDER'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      orders: [
        {id: 2, name: 'Salad'}
      ],
      currentOrder: {id: 1, name: 'Pizza'}
    }));
  });

  it('handles NEXT_ORDER without orders', () => {
    const initialState = fromJS({
      orders: []
    });
    const action = {
      type: 'NEXT_ORDER'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      orders: []
    }));
  });

  it('handles NEXT_ORDER with undefined orders', () => {
    const initialState = fromJS({
    });
    const action = {
      type: 'NEXT_ORDER'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
    }));
  });

  it('handles NEXT_ORDER with one order', () => {
    const initialState = fromJS({
      orders: [
        {id: 1, name: 'Pizza'}
      ]
    });
    const action = {
      type: 'NEXT_ORDER'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      orders: [],
      currentOrder: {id: 1, name: 'Pizza'}
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
