import {Map, fromJS} from 'immutable';

export const defaultState = new Map(fromJS({
  orders: [],
  currentOrder: {}
}));
