
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
  'content-type': 'application/json',
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


module.exports = {
  okResponse,
  errorResponse,
  parseMultipartBody,
}
