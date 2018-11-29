'use strict';

const AWS = require('aws-sdk')

const uuid = require('uuid')
const utils = require('./utils')

const s3 = new AWS.S3()
const ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

exports.create = function(event, context, callback) {

  const newId = uuid.v4()
  const bodyParts = utils.parseMultipartBody(event)

  const s3Params =  {
    Bucket: 'bsvault.net',
    Key: newId,
    Body:  bodyParts.file.content,
  }

  s3.putObject(s3Params,(error,data) => {
    if(error) {
      callback(null, utils.errorResponse(500,error));
    } else {

      utils.unzipAndParseRosz(bodyParts.file.content).then((rosterData)=>{
        if(rosterData === null) callback(null, utils.errorResponse(500,"not a roster??"))
        if(rosterData === undefined) callback(null, utils.errorResponse(500,"not a roster??"))

        const units = utils.walkRoster(rosterData)

        var ddbParams = {
          TableName: 'bsvault_rosters',
          Item: {
            'id' : {N: newId},
            'name' : {S: rosterData.roster.$.name},
            'gameSystemName' : {S: rosterData.roster.$.gameSystemName},
            'catalogueName' : {S: rosterData.roster.forces[0].force[0].$.catalogueName},
            'units' : {S: units},
          }
        }

        ddb.putItem(ddbParams, (error, data) => {
          if (error) {
            callback(null, utils.errorResponse(500,JSON.stringify(error)))
          } else {
            callback(null, utils.okResponse({
              id:newId,
              'name' : rosterData.roster.$.name,
              'gameSystemName' : rosterData.roster.$.gameSystemName,
              'catalogueName' : rosterData.roster.forces[0].force[0].$.catalogueName,
              'event': event,
            }))
          }
        })


      }).catch((error)=>{
        callback(null, utils.errorResponse(500,JSON.stringify(error)))
      })
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
