'use strict';

const AWS = require('aws-sdk')

const uuid = require('uuid')
const utils = require('./utils')

const s3 = new AWS.S3()

exports.create = function(event, context, callback) {

  const newId = uuid.v4()
  const bodyParts = utils.parseMultipartBody(event)

  console.log(bodyParts)

  const s3Params =  {
    Bucket: 'bsvault.net',
    Key: newId,
    Body: bodyParts.content
  }

  s3.putObject(s3Params,(error,data)=>{
    if(error) {
      callback(null, utils.errorResponse(500,error));
    } else {
      callback(null, utils.okResponse({id:newId}));
    }
  })

};

exports.download = (event, context, callback) =>  {
  const id = event.pathParameters.id
  const s3Params = {
    Bucket: 'bsvault.net',
    Key: id,
  }

  const url = s3.getSignedUrl('getObject', s3Params)
  callback(null, utils.okResponse({url}));
}


exports.view = (event, context, callback) => {
  callback(null,  utils.okResponse({all:"ok",id:event.pathParameters.id}))
}
