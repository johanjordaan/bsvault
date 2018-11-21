'use strict';

const fs  = require('fs')
const path = require('path')
const test = require('unit.js')
const utils = require('../api/utils.js')


describe('utils',()=>{

  const event = JSON.parse(fs.readFileSync(path.join(__dirname,`/fixtures/file_event.json`),'utf-8'))

  describe('parseMultipartBody',()=>{
    it('should parse the event and extract the body parts',()=>{
      const result = utils.parseMultipartBody(event)
      console.log(result)
    })

  })
})
