'use strict';

var fs = require('fs');
var path = require('path');

exports.create = function(event, context, callback) {
  var result = {
    statusCode: 200,
    body: JSON.stringify({event}),
    headers: {
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Credentials': true,
     'content-type': 'application/json',
   },
  };

  callback(null, result);
};

exports.view = function(event, context, callback) {
  var result = {
    statusCode: 200,
    body: JSON.stringify({all:"ok",id:event.pathParameters.id}),
    headers: {
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Credentials': true,
     'content-type': 'application/json',
   },
  };

  callback(null, result);
};
