import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setOrders, setCustomers, getCustomer, getOrders, voteOrder} from '../src/core';

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

  describe('setCustomers', () => {

    it('sets the customers in the state', () => {
      const state = new Map();
      const customer1 = new Map({
        id: 1,
        username: 'bsquared',
        name: 'Brian'
      });
      const customer2 = new Map({
        id: 2,
        username: 'lesIsMore',
        name: 'Les'
      });
      const customers = List.of(customer1, customer2);
      const nextState = setCustomers(state, customers);
      expect(nextState).to.equal(new Map({
        customers: List.of(customer1, customer2)
      }));
    });

    it('converts to immutable', () => {
      const state = new Map();
      const customers = [{id: 1, username: 'bsquared', name: 'Brian'},
                         {id: 2, username: 'lesIsMore', name: 'Les'}];
      const nextState = setCustomers(state, customers);
      expect(nextState).to.equal(
        new Map({
          customers: List.of(
            new Map({
              id: 1,
              username: 'bsquared',
              name: 'Brian'
            }),
            new Map({
              id: 2,
              username: 'lesIsMore',
              name: 'Les'
            })
          )
        })
      );
    });

  });

  describe('getCustomer', () => {

    it('returns the customer object', () => {
      const state = fromJS({
        customers: [{id: 1, username: 'bsquared', name: 'Brian'},
                    {id: 2, username: 'lesIsMore', name: 'Les'}]
      });
      const customer = getCustomer(state, 'lesIsMore');
      expect(customer).to.equal(
        fromJS({
          id: 2, username: 'lesIsMore', name: 'Les'
        })
      );
    });

    it('returns null if the customer does not exist', () => {
      const state = fromJS({
        customers: [{id: 1, username: 'bsquared', name: 'Brian'}]
      });
      const customer = getCustomer(state, 'lesIsMore');
      expect(customer).to.equal(null);
    });

  });

  describe('getOrders', () => {

    it('returns all orders if username is null', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza'},
                 {id: 2, name: 'Salad', dietaryTags: ['Vegan']},
                 {id: 3, name: 'Cake', dietaryTags: ['Dessert', 'Chocolate']}],
        customers: [{id: 1, username: 'bsquared', name: 'Brian'},
                    {id: 2, username: 'lesIsMore', name: 'Les', dietaryTags: ['Dessert']}]
      });
      const orders = getOrders(state, null);
      expect(orders).to.equal(
        fromJS([{id: 1, name: 'Pizza'},
                {id: 2, name: 'Salad', dietaryTags: ['Vegan']},
                {id: 3, name: 'Cake', dietaryTags: ['Dessert', 'Chocolate']}])
      );
    });

    it('returns all orders if a customer has no dietary preferences', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza'},
                 {id: 2, name: 'Salad', dietaryTags: ['Vegan']},
                 {id: 3, name: 'Cake', dietaryTags: ['Dessert', 'Chocolate']}],
        customers: [{id: 1, username: 'bsquared', name: 'Brian'},
                    {id: 2, username: 'lesIsMore', name: 'Les', dietaryTags: ['Dessert']}]
      });
      const orders = getOrders(state, 'bsquared');
      expect(orders).to.equal(
        fromJS([{id: 1, name: 'Pizza'},
                {id: 2, name: 'Salad', dietaryTags: ['Vegan']},
                {id: 3, name: 'Cake', dietaryTags: ['Dessert', 'Chocolate']}])
      );
    });

    it('returns only orders that match the customer dietary preferences', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza'},
                 {id: 2, name: 'Salad', dietaryTags: ['Vegan']},
                 {id: 3, name: 'Cake', dietaryTags: ['Dessert', 'Chocolate']}],
        customers: [{id: 1, username: 'bsquared', name: 'Brian'},
                    {id: 2, username: 'lesIsMore', name: 'Les', dietaryTags: ['Dessert']}]
      });
      const orders = getOrders(state, 'lesIsMore');
      expect(orders).to.equal(
        fromJS([{id: 3, name: 'Cake', dietaryTags: ['Dessert', 'Chocolate']}])
      );
    });

  });

  describe('voteOrder', () => {

    it('ignores empty order list', () => {
      const state = fromJS({
        customers: [{id: 1, username: 'bsquared', name: 'Brian'}]
      });
      const nextState = voteOrder(state, 1, 2, true);
      expect(nextState).to.equal(
        fromJS({
          customers: [{id: 1, username: 'bsquared', name: 'Brian'}]
        })
      );
    });

    it('ignores nonexistent order', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza'}, {id: 3, name: 'Cake'}],
        customers: [{id: 1, username: 'bsquared', name: 'Brian'}]
      });
      const nextState = voteOrder(state, 1, 2, true);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza'}, {id: 3, name: 'Cake'}],
          customers: [{id: 1, username: 'bsquared', name: 'Brian'}]
        })
      );
    });

    it('ignores empty customer list', () => {
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

    it('ignores nonexistent customer', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}],
        customers: [{id: 2, username: 'lesIsMore', name: 'Les'}]
      });
      const nextState = voteOrder(state, 1, 2, true);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}],
          customers: [{id: 2, username: 'lesIsMore', name: 'Les'}]
        })
      );
    });

    it('favorites and upvotes an order when no favorites are set', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}, {id: 3, name: 'Cake'}],
        customers: [{id: 1, username: 'bsquared', name: 'Brian'}]
      });
      const nextState = voteOrder(state, 1, 2, true);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad', popularity: 1}, {id: 3, name: 'Cake'}],
          customers: [{id: 1, username: 'bsquared', name: 'Brian', favorites: [2]}]
        })
      );
    });

    it('favorites and upvotes an order when favorites are already set', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}],
        customers: [{id: 1, username: 'bsquared', name: 'Brian', favorites: [1], rejections: [2, 3]}]
      });
      const nextState = voteOrder(state, 1, 2, true);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 4}, {id: 3, name: 'Cake'}],
          customers: [{id: 1, username: 'bsquared', name: 'Brian', favorites: [1, 2], rejections: [3]}]
        })
      );
    });

    it('ignores a favorite with duplicate', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}],
        customers: [{id: 1, username: 'bsquared', name: 'Brian', favorites: [2]}]
      });
      const nextState = voteOrder(state, 1, 2, true);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}],
          customers: [{id: 1, username: 'bsquared', name: 'Brian', favorites: [2]}]
        })
      );
    });

    it('rejects and downvotes an order when no rejections are set', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}, {id: 3, name: 'Cake'}],
        customers: [{id: 1, username: 'bsquared', name: 'Brian'}]
      });
      const nextState = voteOrder(state, 1, 2, false);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad', popularity: -1}, {id: 3, name: 'Cake'}],
          customers: [{id: 1, username: 'bsquared', name: 'Brian', rejections: [2]}]
        })
      );
    });

    it('rejects and downvotes an order when rejections are already set', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}],
        customers: [{id: 1, username: 'bsquared', name: 'Brian', favorites: [2, 3], rejections: [1]}]
      });
      const nextState = voteOrder(state, 1, 2, false);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 2}, {id: 3, name: 'Cake'}],
          customers: [{id: 1, username: 'bsquared', name: 'Brian', favorites: [3], rejections: [1, 2]}]
        })
      );
    });

    it('ignores a rejection with duplicate', () => {
      const state = fromJS({
        orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}],
        customers: [{id: 1, username: 'bsquared', name: 'Brian', rejections: [2]}]
      });
      const nextState = voteOrder(state, 1, 2, false);
      expect(nextState).to.equal(
        fromJS({
          orders: [{id: 1, name: 'Pizza', popularity: 9}, {id: 2, name: 'Salad', popularity: 3}, {id: 3, name: 'Cake'}],
          customers: [{id: 1, username: 'bsquared', name: 'Brian', rejections: [2]}]
        })
      );
    });

  });

});
