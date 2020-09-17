var ajax = function (options) {
  var method = options.method || 'get'
  var url = options.url
  var body = options.body || {}
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    const token = localStorage.getItem('todo-key')
    if (token) {
      xhr.setRequestHeader('authorization', 'Bearer ' + token)
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.response))
        } else {
          reject(xhr)
        }
      }
    }
    xhr.send(JSON.stringify(body))
  })
}

if (window.module) {
  module.exports = ajax
}
