(function () {
  const baseURL = 'http://127.0.0.1:3000/api'
  const registerButton = document.querySelector('.register-button')

  registerButton.addEventListener('click', function () {
    const registerForm = document.querySelector('.register-form')

    const inputList = registerForm.querySelectorAll('input')
    const params = {}
    inputList.forEach(input => {
      params[input.name] = input.value
    })

    ajax({
      method: 'post',
      url: baseURL + '/register',
      body: params
    }).then(res => {
      if (res.error) {
        alert(res.error.value)
        return
      }
      alert('注册成功')
      location.href = '/login.html'
    })
  })
})()
