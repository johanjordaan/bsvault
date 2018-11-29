'use strict';

const fs  = require('fs')
const path = require('path')
const _ = require('lodash')
const utils = require('../api/utils.js')


const chai = require('chai');
const should = chai.should();

const fileName = (name) =>{
  return path.join(__dirname,path.join('fixtures',name))
}

describe('utils',()=>{
  describe('parseMultipartBody',()=>{
    const event = JSON.parse(fs.readFileSync(fileName('file_event.json'),'utf-8'))

    it('should parse the event and extract the body parts',()=>{
      const result = utils.parseMultipartBody(event)

      should.exist(result.file)
      result.file.type.should.equal('file')
      //test.number(result.statusCode).is(200);
      //test.string(result.body).contains('Congratulations');
      //test.value(result).hasHeader('content-type', 'text/html');
      //console.log(result)
    })
  })

  describe('unzipAndParseRosz',()=>{
    const fileBuffer = fs.readFileSync(fileName('1000pt Khorne Vanguard.rosz'))
    it('should unzip and parse the buffer',(done)=>{

      utils.unzipAndParseRosz(fileBuffer).then((result)=>{
        fs.writeFileSync(fileName('1000pt Khorne Vanguard.rosz.json'),JSON.stringify(result,null,2))




        const units = utils.walkRoster(result)
        console.log(units)
        //console.log(result.roster.$.name)
        //console.log(result.roster.$.gameSystemName)
        //console.log(result.roster.forces[0].force[0].$.name)
        //console.log(result.roster.forces[0].force[0].$.catalogueName)

        done()
      }).catch((error)=>{
        console.log(error)
        done(error)
      })
    })
  })
})
