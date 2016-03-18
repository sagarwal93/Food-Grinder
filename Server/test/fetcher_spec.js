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

});
