'use strict';

const fs  = require('fs')
const path = require('path')
const test = require('unit.js')
const utils = require('../api/utils.js')

const fileName = (name) =>{
  return path.join(__dirname,path.join('fixtures',name))
}

describe('utils',()=>{
  describe('parseMultipartBody',()=>{
    const event = JSON.parse(fs.readFileSync(fileName('file_event.json'),'utf-8'))

    it('should parse the event and extract the body parts',()=>{
      const result = utils.parseMultipartBody(event)
      console.log(result)
    })
  })

  describe('unzipAndParseRosz',()=>{
    const fileBuffer = fs.readFileSync(fileName('1000pt Khorne Vanguard.rosz'))
    it('should unzip and parse the buffer',()=>{

      //utils.unzipAndParseRosz(fileBuffer)
      //console.log(fileBuffer)
    })
  })
})
