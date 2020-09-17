const baseURL = 'http://127.0.0.1:3000/api'
const loginButton = document.querySelector('.login-button')

loginButton.addEventListener('click', function (e) {
  const username = document.querySelector('input[name=username]').value
  const password = document.querySelector('input[name=password]').value
  ajax({
    method: 'post',
    url: baseURL + '/login',
    body: { username, password }
  }).then(res => {
    if (res.error) {
      alert(res.error.value)
      return
    }
    const token = res.data.token
    localStorage.setItem('todo-key', token)
    location.href = '/index.html'
  })
})

