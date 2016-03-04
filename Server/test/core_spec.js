import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setOrders, setCustomer, voteOrder} from '../src/core';

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

  describe('voteOrder', () => {

    it('ignores nonexistent customer', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}]
      });
      const nextState = voteOrder(state, 1, 2, true);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}]
        })
      );
    });

    it('ignores incorrect customer ID', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}],
        customer: {id: 2, name: 'Les'}
      });
      const nextState = voteOrder(state, 1, 2, true);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}],
          customer: {id: 2, name: 'Les'}
        })
      );
    });

    it('ignores/removes a nonexistent order', () => {
      const state = fromJS({
        customer: {id: 1, name: 'Brian', favorites: [2], rejections: [2, 3]}
      });
      const nextState = voteOrder(state, 1, 2, true);
      expect(nextState).to.equal(
        fromJS({
          customer: {id: 1, name: 'Brian', favorites: [], rejections: [3]}
        })
      );
    });

    it('favorites and upvotes an order when no favorites are set', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}, {id: 3, name: 'Cake'}],
        customer: {id: 1, name: 'Brian'}
      });
      const nextState = voteOrder(state, 1, 2, true);
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
      const nextState = voteOrder(state, 1, 2, true);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 4}, {id: 3, name: 'Cake'}],
          customer: {id: 1, name: 'Brian', favorites: [1, 2]}
        })
      );
    });

    it('rejects and downvotes an order when no rejections are set', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}, {id: 3, name: 'Cake'}],
        customer: {id: 1, name: 'Brian'}
      });
      const nextState = voteOrder(state, 1, 2, false);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad', popularity: -1}, {id: 3, name: 'Cake'}],
          customer: {id: 1, name: 'Brian', rejections: [2]}
        })
      );
    });

    it('rejects and downvotes an order when rejections are already set', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}],
        customer: {id: 1, name: 'Brian', rejections: [1]}
      });
      const nextState = voteOrder(state, 1, 2, false);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 2}, {id: 3, name: 'Cake'}],
          customer: {id: 1, name: 'Brian', rejections: [1, 2]}
        })
      );
    });

    it('ignores an order with duplicate', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}],
        customer: {id: 1, name: 'Brian', favorites: [2]}
      });
      const nextState = voteOrder(state, 1, 2, true);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}],
          customer: {id: 1, name: 'Brian', favorites: [2]}
        })
      );
    });

  });

});
