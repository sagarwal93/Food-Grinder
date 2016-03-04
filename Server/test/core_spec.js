import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setOrders, setCustomer, favoriteOrder} from '../src/core';

describe('application logic', () => {

  describe('setOrders', () => {

    it('adds the orders to the state', () => {
      const state = new Map();
      const order1 = new Map({
        id: 1,
        name: 'Pizza'
      });
      const order2 = new Map({
        id: 2,
        name: 'Salad'
      });
      const orders = List.of(order1, order2);
      const nextState = setOrders(state, orders);
      expect(nextState).to.equal(new Map({
        orders: List.of(order1, order2)
      }));
    });

    it('converts to immutable', () => {
      const state = new Map();
      const orders = [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}];
      const nextState = setOrders(state, orders);
      expect(nextState).to.equal(
        new Map({
          orders: List.of(
            new Map({
              id: 1,
              name: 'Pizza'
            }),
            new Map({
              id: 2,
              name: 'Salad'
            })
          )
        })
      );
    });

  });

  describe('setCustomer', () => {

    it('adds the customer to the state', () => {
      const state = new Map();
      const brian = new Map({
        id: 1,
        name: 'Brian',
        favorites: List.of(1, 2),
        rejections: List.of(3, 4)
      });
      const nextState = setCustomer(state, brian);
      expect(nextState).to.equal(new Map({
        customer: brian
      }));
    });

    it('converts to immutable', () => {
      const state = new Map();
      const brian = {id: 1, name: 'Brian', favorites: [1, 2], rejections: [3, 4]};
      const nextState = setCustomer(state, brian);
      expect(nextState).to.equal(
        new Map({
          customer: new Map({
            id: 1,
            name: 'Brian',
            favorites: List.of(1, 2),
            rejections: List.of(3, 4)
          })
        })
      );
    });

  });

  // describe('getCustomerOrders', () => {
  //
  //   it('returns the upcoming orders for a given a customer with no favorites', () => {
  //     const orders = fromJS(
  //       [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}, {id: 3, name: 'Cake'}]
  //     );
  //     const customer = fromJS({
  //       id: 1, name: 'Brian'
  //     });
  //
  //     expect(getCustomerOrders(orders, customer)).to.equal(fromJS({
  //       suggestions: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}, {id: 3, name: 'Cake'}]
  //     }));
  //   });
  //
  //   it('returns the favorite and upcoming orders for a given a customer with a single favorite', () => {
  //     const orders = fromJS(
  //       [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}, {id: 3, name: 'Cake'}]
  //     );
  //     const customer = fromJS({
  //       id: 1, name: 'Brian', favorites: [2]
  //     });
  //
  //     expect(getCustomerOrders(orders, customer)).to.equal(fromJS({
  //       suggestions: [{id: 1, name: 'Pizza'}, {id: 3, name: 'Cake'}],
  //       favorites: [{id: 2, name: 'Salad'}]
  //     }));
  //   });
  //
  //   it('returns the favorite and upcoming orders for a given a customer with multiple favorites', () => {
  //     const orders = fromJS(
  //       [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}, {id: 3, name: 'Cake'}]
  //     );
  //     const customer = fromJS({
  //       id: 1, name: 'Brian', favorites: [1, 3]
  //     });
  //
  //     expect(getCustomerOrders(orders, customer)).to.equal(fromJS({
  //       suggestions: [{id: 2, name: 'Salad'}],
  //       favorites: [{id: 1, name: 'Pizza'}, {id: 3, name: 'Cake'}]
  //     }));
  //   });
  //
  // });

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
  describe('favoriteOrder', () => {

    it('favorites and upvotes an order when no favorites are set', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}, {id: 3, name: 'Cake'}],
        customer: {id: 1, name: 'Brian'}
      });
      const nextState = favoriteOrder(state, 1, 2);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad', popularity: 1}, {id: 3, name: 'Cake'}],
          customer: {id: 1, name: 'Brian', favorites: [2]}
        })
      );
    });

    it('favorites and upvotes an order when favorites are already set', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}],
        customer: {id: 1, name: 'Brian', favorites: [1]}
      });
      const nextState = favoriteOrder(state, 1, 2);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 4}, {id: 3, name: 'Cake'}],
          customer: {id: 1, name: 'Brian', favorites: [1, 2]}
        })
      );
    });

    it('favorites and upvotes an order with duplicate', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}],
        customer: {id: 1, name: 'Brian', favorites: [2]}
      });
      const nextState = favoriteOrder(state, 1, 2);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}],
          customer: {id: 1, name: 'Brian', favorites: [2]}
        })
      );
    });

  });

});
