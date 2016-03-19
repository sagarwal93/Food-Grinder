import {buildChewsierOrder, buildChewsierOrders} from '../src/esclient';
import {expect} from 'chai';

describe('buildChewsierOrder', () => {
  it('should gracefully handle missing data while transforming into an internal representation of an order', () => {
    const esorder = {
      _index: 'chewsier',
      _type: 'orders',
      _id: 'AVOKKMuAN1D0c2H_dvh5',
      _score: 1,
      _source: {
        name: 'Apple Pecan Chicken Salad (Full Size)',
        description: 'Sink your fork into crispy hand-picked red and green apples,' +
        ' roasted pecans, sweet dried cranberries and real blue cheese crumbles. ' +
        'Then we add tender grilled chicken and pomegranate vinaigrette dressing to ' +
        'the mix for a sweet combination, perfect for any meal.',
        price: 6.99,
        geolocation: {
          lat: 33.844411,
          lon: -84.36393
        }
      }
    };
    const convertedOrder = buildChewsierOrder(esorder);
    const expectedOrder = {
      id: 'AVOKKMuAN1D0c2H_dvh5',
      name: 'Apple Pecan Chicken Salad (Full Size)',
      company: null,
      description: 'Sink your fork into crispy hand-picked red and green apples,' +
      ' roasted pecans, sweet dried cranberries and real blue cheese crumbles. ' +
      'Then we add tender grilled chicken and pomegranate vinaigrette dressing to ' +
      'the mix for a sweet combination, perfect for any meal.',
      price: 6.99,
      dietaryTags: null,
      modifiers: null,
      geolocation: {
        lat: 33.844411,
        lon: -84.36393
      }
    };
    expect(convertedOrder).to.deep.equal(expectedOrder);
  });

  it('should transform an elasticsearch representation of an order into an internal representation of an order', () => {
    const esorder = {
      _index: 'chewsier',
      _type: 'orders',
      _id: 'AVOKLFrZN1D0c2H_dvh7',
      _score: 1,
      _source: {
        name: '1/4 Lb. Single Burger',
        company: 'Wendy\'s',
        description: 'A quarter-pound of 100% real beef and the freshest premium toppings on warm, toasted buns.',
        dietaryTags: [
          'No Poultry',
          'No Pork',
          'No Seafood'
        ],
        modifiers: [
          'Bun',
          'Mayo',
          'Ketchup',
          'Pickle',
          'Red onoin',
          'Lettuce',
          'Tomato',
          'American Cheese'
        ],
        price: 5.59,
        geolocation: {
          lat: 33.777582,
          lon: -84.388508
        }
      }
    };
    const convertedOrder = buildChewsierOrder(esorder);
    const expectedOrder = {
      id: 'AVOKLFrZN1D0c2H_dvh7',
      name: '1/4 Lb. Single Burger',
      company: 'Wendy\'s',
      description: 'A quarter-pound of 100% real beef and the freshest premium toppings on warm, toasted buns.',
      dietaryTags: [
        'No Poultry',
        'No Pork',
        'No Seafood'
      ],
      modifiers: [
        'Bun',
        'Mayo',
        'Ketchup',
        'Pickle',
        'Red onoin',
        'Lettuce',
        'Tomato',
        'American Cheese'
      ],
      price: 5.59,
      geolocation: {
        lat: 33.777582,
        lon: -84.388508
      }
    };
    expect(convertedOrder).to.deep.equal(expectedOrder);
  });
});

describe('buildChewsierOrders', () =>{
  it('should convert an array of esorders to chewsier orders', ()=>{
    const eseorderArray = [
      {
        _index: 'chewsier',
        _type: 'orders',
        _id: 'AVOKLFrZN1D0c2H_dvh7',
        _score: 1,
        _source: {
          name: 'order 1',
          company: 'Company 1',
          description: 'description 1.',
          dietaryTags: [
            'Tag 1'
          ],
          modifiers: [
            'Mod 1'
          ],
          price: 5.59,
          geolocation: {
            lat: 1,
            lon: 1
          }
        }
      },
      {
        _index: 'chewsier',
        _type: 'orders',
        _id: 'AVOKKMuAN1D0c2H_dvh5',
        _score: 1,
        _source: {
          name: 'order 2',
          description: 'description 2.',
          price: 6.99,
          geolocation: {
            lat: 2,
            lon: 2
          }
        }
      },
      {
        _index: 'chewsier',
        _type: 'orders',
        _id: 'AVOKLBkjN1D0c2H_dvh6',
        _score: 1,
        _source: {
          name: 'order 3',
          description: 'description 3.',
          price: 6.99,
          geolocation: {
            lat: 3,
            lon: 3
          }
        }
      }];
    const convertedOrderArray = buildChewsierOrders(eseorderArray);
    const expectedOrderArray = [
      {
        id: 'AVOKLFrZN1D0c2H_dvh7',
        name: 'order 1',
        company: 'Company 1',
        description: 'description 1.',
        dietaryTags: ['Tag 1'],
        modifiers: ['Mod 1'],
        price: 5.59,
        geolocation: {
          lat: 1,
          lon: 1
        }
      },
      {
        id: 'AVOKKMuAN1D0c2H_dvh5',
        name: 'order 2',
        company: null,
        description: 'description 2.',
        dietaryTags: null,
        modifiers: null,
        price: 6.99,
        geolocation: {
          lat: 2,
          lon: 2
        }
      },
      {
        id: 'AVOKLBkjN1D0c2H_dvh6',
        name: 'order 3',
        company: null,
        description: 'description 3.',
        dietaryTags: null,
        modifiers: null,
        price: 6.99,
        geolocation: {
          lat: 3,
          lon: 3
        }
      }
    ];
    expect(convertedOrderArray).to.deep.equal(expectedOrderArray);
  });
});
