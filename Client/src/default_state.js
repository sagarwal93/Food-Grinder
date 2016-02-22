import {Map, fromJS} from 'immutable';

export const defaultState = new Map(fromJS({
  orders: [
    {id: 1, name: 'The Default Order'}
  ],
  currentOrder: {id: 0, name: 'The Default Current Order'}
}));
