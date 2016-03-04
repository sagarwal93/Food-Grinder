import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setOrders, setCustomer} from '../src/core';

describe('application logic', () => {

  describe('setOrders', () => {

    it('adds the orders to the state', () => {
      const state = Map();
      const order1 = Map({
        id:1,
        name:'Pizza'
      });
      const order2 = Map({
        id:2,
        name:'Salad'
      });
      const orders = List.of(order1, order2);
      const nextState = setOrders(state, orders);
      expect(nextState).to.equal(Map({
        orders: List.of(order1, order2)
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const orders = [{id:1, name:'Pizza'}, {id:2, name:'Salad'}];
      const nextState = setOrders(state, orders);
      expect(nextState).to.equal(
        Map({
          orders: List.of(
            Map({
              id:1,
              name:'Pizza'
            }),
            Map({
              id:2,
              name:'Salad'
            })
          )
        })
      );
    });

  });

  describe('setCustomer', () => {

    it('adds the customer to the state', () => {
      const state = Map();
      const brian = Map({
        id:1,
        name:'Brian'
      });
      const nextState = setCustomer(state, brian);
      expect(nextState).to.equal(Map({
        customer: brian
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const brian = {id:1, name:'Brian'};
      const nextState = setCustomer(state, brian);
      expect(nextState).to.equal(
        Map({
          customer: Map({
            id:1,
            name:'Brian'
          })
        })
      );
    });

  });

  // describe('next', () => {
  //
  //   it('takes the next two entries under vote', () => {
  //     const state = Map({
  //       entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
  //     });
  //     const nextState = next(state);
  //     expect(nextState).to.equal(Map({
  //       vote: Map({
  //         pair: List.of('Trainspotting', '28 Days Later')
  //       }),
  //       entries: List.of('Sunshine')
  //     }));
  //   });
  //
  //   it('puts winner of current vote back to entries', () => {
  //     const state = Map({
  //       vote: Map({
  //         pair: List.of('Trainspotting', '28 Days Later'),
  //         tally: Map({
  //           'Trainspotting': 4,
  //           '28 Days Later': 2
  //         })
  //       }),
  //       entries: List.of('Sunshine', 'Millions', '127 Hours')
  //     });
  //     const nextState = next(state);
  //     expect(nextState).to.equal(Map({
  //       vote: Map({
  //         pair: List.of('Sunshine', 'Millions')
  //       }),
  //       entries: List.of('127 Hours', 'Trainspotting')
  //     }));
  //   });
  //
  //   it('puts both from tied vote back to entries', () => {
  //     const state = Map({
  //       vote: Map({
  //         pair: List.of('Trainspotting', '28 Days Later'),
  //         tally: Map({
  //           'Trainspotting': 3,
  //           '28 Days Later': 3
  //         })
  //       }),
  //       entries: List.of('Sunshine', 'Millions', '127 Hours')
  //     });
  //     const nextState = next(state);
  //     expect(nextState).to.equal(Map({
  //       vote: Map({
  //         pair: List.of('Sunshine', 'Millions')
  //       }),
  //       entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
  //     }));
  //   });
  //
  //   it('marks winner when just one entry left', () => {
  //     const state = Map({
  //       vote: Map({
  //         pair: List.of('Trainspotting', '28 Days Later'),
  //         tally: Map({
  //           'Trainspotting': 4,
  //           '28 Days Later': 2
  //         })
  //       }),
  //       entries: List()
  //     });
  //     const nextState = next(state);
  //     expect(nextState).to.equal(Map({
  //       winner: 'Trainspotting'
  //     }));
  //   });
  //
  // });
  //
  // describe('vote', () => {
  //
  //   it('creates a tally for the voted entry', () => {
  //     const state = Map({
  //       pair: List.of('Trainspotting', '28 Days Later')
  //     });
  //     const nextState = vote(state, 'Trainspotting')
  //     expect(nextState).to.equal(Map({
  //       pair: List.of('Trainspotting', '28 Days Later'),
  //       tally: Map({
  //         'Trainspotting': 1
  //       })
  //     }));
  //   });
  //
  //   it('adds to existing tally for the voted entry', () => {
  //     const state = Map({
  //       pair: List.of('Trainspotting', '28 Days Later'),
  //       tally: Map({
  //         'Trainspotting': 3,
  //         '28 Days Later': 2
  //       })
  //     });
  //     const nextState = vote(state, 'Trainspotting');
  //     expect(nextState).to.equal(Map({
  //       pair: List.of('Trainspotting', '28 Days Later'),
  //       tally: Map({
  //         'Trainspotting': 4,
  //         '28 Days Later': 2
  //       })
  //     }));
  //   });
  //
  // });

});
