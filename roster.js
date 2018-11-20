'use strict';

var fs = require('fs');
var path = require('path');

exports.create = function(event, context, callback) {
  var result = {
    statusCode: 200,
    body: JSON.stringify(['Hallo','world']),
    headers: {'content-type': 'application/json'}
  };

  callback(null, result);
};

exports.view = function(event, context, callback) {
  var result = {
    statusCode: 200,
    body: JSON.stringify({all:"ok",event}),
    headers: {'content-type': 'application/json'}
  };

  callback(null, result);
};
