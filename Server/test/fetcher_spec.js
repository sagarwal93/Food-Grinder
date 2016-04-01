import {fromJS} from 'immutable';
import {expect} from 'chai';

import fetch from '../src/fetcher';

describe('fetcher', () => {

  it('handles GET_CUSTOMER', () => {
    const initialState = fromJS({
      orders: [{id: 1, name: 'Pizza'}, {id: 2, name: 'Salad'}, {id: 3, name: 'Cake'}],
      customers: [{id: 1, username: 'bsquared', name: 'Brian'},
                  {id: 1, username: 'lesIsMore', name: 'Les'}]
    });
    const data = {type: 'GET_CUSTOMER', username: 'lesIsMore'};
    const customer = fetch(initialState, data);
    expect(customer).to.equal(fromJS({
      id: 1, username: 'lesIsMore', name: 'Les'
    }));
  });

  it('handles GET_ORDERS', () => {
    const initialState = fromJS({
      orders: [{id: 1, name: 'Pizza'},
               {id: 2, name: 'Salad', dietaryTags: ['Vegan']},
               {id: 3, name: 'Cake', dietaryTags: ['Dessert', 'Chocolate']}],
      customers: [{id: 1, username: 'bsquared', name: 'Brian'},
                  {id: 2, username: 'lesIsMore', name: 'Les', dietaryTags: ['Dessert']}]
    });
    const data = {type: 'GET_ORDERS', username: 'lesIsMore'};
    const orders = fetch(initialState, data);
    expect(orders).to.equal(
      fromJS([{id: 3, name: 'Cake', dietaryTags: ['Dessert', 'Chocolate']}])
    );
  });

});
