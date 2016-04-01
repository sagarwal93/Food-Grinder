const config = require('../config.json');
export const elasticsearch = require('elasticsearch');
export const esclient = new elasticsearch.Client({
  host: config.elasticsearch.host + ':' + config.elasticsearch.port,
  log: config.elasticsearch.log_level
});

export function buildChewsierOrder(order) {
  return {
    id: order._id || null,
    name: order._source.name || null,
    company: order._source.company || null,
    description: order._source.description || null,
    dietaryTags: order._source.dietaryTags || null,
    modifiers: order._source.modifiers || null,
    price: order._source.price || null,
    geolocation: order._source.geolocation || null
  };
}

export function buildChewsierOrders(orders) {
  return orders.map(function(obj) {
    return buildChewsierOrder(obj);
  });
}
