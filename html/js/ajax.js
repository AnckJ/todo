define(function () {
  return function (options) {
    var method = options.method || 'get'
    var url = options.url
    var body = options.body || {}
    var headers = options.headers
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest()
      xhr.withCredentials = true
      xhr.open(method, url)
      if (!headers) {
        xhr.setRequestHeader('Content-Type', 'application/json')
      }
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
      xhr.send(body instanceof FormData ? body : JSON.stringify(body))
    })
  }
})
