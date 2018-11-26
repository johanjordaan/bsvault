'use strict';

const fs  = require('fs')
const path = require('path')
const test = require('unit.js')
const utils = require('../api/utils.js')


describe('utils',()=>{
  describe('parseMultipartBody',()=>{
    const event = JSON.parse(fs.readFileSync(path.join(__dirname,`/fixtures/file_event.json`),'utf-8'))

    it('should parse the event and extract the body parts',()=>{
      const result = utils.parseMultipartBody(event)
      console.log(result)
    })
  })

  describe('unzipAndParseRosz',()=>{
        
    it('should unzip and parse the buffer',()=>{

    })
  })
})
