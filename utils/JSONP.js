import JSOPN from 'jsonp'

export default function (url, data, opts) {
  return new Promise((resolve, reject) => {
    JSOPN(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

//拼接url
function param (data) {
  let url = ''
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
