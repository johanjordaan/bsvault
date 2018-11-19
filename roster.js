'use strict';

var fs = require('fs');
var path = require('path');

exports.get = function(event, context, callback) {
  var result = {
    statusCode: 200,
    body: JSON.stringify(['Hallo','world']),
    headers: {'content-type': 'application/json'}
  };

  callback(null, result);
};
