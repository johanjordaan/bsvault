'use strict';

var fs = require('fs');
var path = require('path');

exports.index = function(event, context, callback) {
  var contents = fs.readFileSync(`..${path.sep}public${path.sep}index.html`);
  var result = {
    statusCode: 200,
    body: contents.toString(),
    headers: {'content-type': 'text/html'}
  };

  callback(null, result);
};
