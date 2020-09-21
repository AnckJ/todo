require(['js/baseUrl', 'js/ajax'], function (baseURL, ajax) {
  const registerButton = document.querySelector('.register-button')

  registerButton.addEventListener('click', function () {
    const registerForm = document.querySelector('.register-form')

    const inputList = registerForm.querySelectorAll('input')
    const params = {}
    inputList.forEach(input => {
      params[input.name] = input.value
    })

    if (!params.username) {
      alert('用户名必填！')
      return
    }

    if (!params.password) {
      alert('密码必填！')
      return
    }

    if (!params.email) {
      alert('邮箱必填！')
      return
    }

    ajax({
      method: 'post',
      url: baseURL + '/api/register',
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
})
