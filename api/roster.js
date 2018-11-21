'use strict';

const uuid = require('uuid')
const utils = require('./utils')

exports.create = function(event, context, callback) {


  var result = {
    statusCode: 200,
    body: JSON.stringify({uuid:uuid.v4()}),
    headers:utils.standardHeaders,
  };

  callback(null, result);
};

exports.view = function(event, context, callback) {
  var result = {
    statusCode: 200,
    body: JSON.stringify({all:"ok",id:event.pathParameters.id}),
    headers:utils.standardHeaders,
  };

  callback(null, result);
};
