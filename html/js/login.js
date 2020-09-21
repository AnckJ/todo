require(['js/baseUrl', 'js/ajax'], function (baseURL, ajax) {
  const loginButton = document.querySelector('.login-button')
  loginButton.addEventListener('click', function () {
    const loginForm = document.querySelector('.login-form')
    const username = loginForm.querySelector('input[name=username]').value
    const password = loginForm.querySelector('input[name=password]').value
    ajax({
      method: 'post',
      url: baseURL + '/api/login',
      body: { username, password }
    }).then(res => {
      if (res.error) {
        alert(res.error.value)
        return
      }
      const token = res.data.token
      const user = res.data.user
      localStorage.setItem('todo-key', token)
      localStorage.setItem('todo-user', JSON.stringify(user))
      location.href = '/index.html'
    })
  })
})
