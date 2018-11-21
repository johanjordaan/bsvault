'use strict';

var fs = require('fs')
var path = require('path')
const utils = require('./utils')

exports.create = function(event, context, callback) {

  var result = {
    statusCode: 200,
    body: JSON.stringify({event}),
    headers:utils.headers,
  };

  callback(null, result);
};

exports.view = function(event, context, callback) {
  var result = {
    statusCode: 200,
    body: JSON.stringify({all:"ok",id:event.pathParameters.id}),
    headers:utils.headers,
  };

  callback(null, result);
};
