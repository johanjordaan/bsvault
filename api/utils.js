const _ = require('lodash')

const parseMultipartBody = (event) => {
  const getValueIgnoringKeyCase = (object, key) => {
    const foundKey = Object
     .keys(object)
     .find(currentKey => currentKey.toLocaleLowerCase() === key.toLowerCase())
    return object[foundKey]
  }

  const boundary = getValueIgnoringKeyCase(event.headers, 'Content-Type').split('=')[1]
  const result = {};
  event.body
    .split(boundary)
    .forEach(item => {
        if (/filename=".+"/g.test(item)) {
            result[item.match(/name=".+";/g)[0].slice(6, -2)] = {
                type: 'file',
                filename: item.match(/filename=".+"/g)[0].slice(10, -1),
                contentType: item.match(/Content-Type:\s.+/g)[0].slice(14),
                content: Buffer.from(item.slice(item.search(/Content-Type:\s.+/g) + item.match(/Content-Type:\s.+/g)[0].length + 4, -4), 'binary')
            };
        } else if (/name=".+"/g.test(item)){
            result[item.match(/name=".+"/g)[0].slice(6, -1)] = item.slice(item.search(/name=".+"/g) + item.match(/name=".+"/g)[0].length + 4, -4)
        }
    })
    return result
}

const standardHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json',
}


const okResponse = (returnValue) => {
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue),
    headers:standardHeaders,
  }
}

const errorResponse = (statusCode,message) => {
  return {
    statusCode,
    body: JSON.stringify({message}),
    headers:standardHeaders,
  }
}

const AdmZip = require('adm-zip')
const parseXmlString = require('xml2js').parseString
const unzipAndParseRosz = (buffer) => {
  return new Promise((resolve, reject)=>{
    const admZip = new AdmZip(buffer)
    const zipEntries = admZip.getEntries()
    const roster = admZip.readAsText(zipEntries[0])
      parseXmlString(roster, (err, result) => {
        if(err) {
          reject(err)
        }
        resolve(result)
    })
  })
}


const walkRoster = (root) => {
  const acc = []
  let current = null
  const _walk = (item,itemKey,parent,parentKey,path) => {
    if(_.isObject(item)) {
      _.each(_.keys(item),(key)=>{
        _walk(item[key],key,item,itemKey,`${path}.${key}`)
      })
    } else if(_.isArray(item)) {
      _.each(items,(listItem,i)=>{
        _walk(listItem,i,item,itemKey,`${path}[${i}]`)
      })
    } else {

      if(parent.name === 'Khorgorath') item = 'model'

      if(parentKey === '$') {
        if(itemKey === 'type' && item === 'unit') {
          if(current !== null) {
            if(current.modelName === undefined) {
              current.modelName = current.unitName
              current.unitCount = 1
            }
            acc.push(current)
          }
          current = {
            unitName:parent.name
          }
        }
        if(itemKey === 'type' && item === 'model') {
          if(current !== null) {
            let name = parent.name
            const tokens = name.split(" ")
            let count = 1
            if(tokens.length >1) {
              count = Number(tokens[0])
              if(count === NaN) count = 1
              name = name.replace(tokens[0],"").trim()
            }

            current.modelName = name
            current.unitCount = count
          }
        }
      }
    }
  }
  _walk(root,null,null,null,'')
  return acc
}


module.exports = {
  okResponse,
  errorResponse,
  parseMultipartBody,
  unzipAndParseRosz,
  walkRoster,
}
