define(
  ['js/getUserinfo', 'js/baseUrl', 'js/ajax', 'js/dialog'],
  function (getUserinfo, baseURL, ajax, createDialog) {
    const user = getUserinfo()
    generateUser()

    function getTempate (user) {
      const avatarUrl = user.avatar || '../images/bg.jpg'

      const template = `
        <div class="userinfo-update">
          <div class="form userinfo-form">
            <div class="form-item">
              <span class="form-item__label">
                头　像
              </span>
              <span>
                <img src="${avatarUrl}" class="form-item__avatar" />
              </span>
              <input class="upload-input" type="file" accept="image/*" />
            </div>
            <div class="form-item">
              <span class="form-item__label">
                <span class="required">*</span>
                用户名
              </span>
              <input class="input" type="text" name="username" placeholder="请输入用户名" value="${user.username}"/>
            </div>
            <div class="form-item">
              <span class="form-item__label">
                密　码
              </span>
              <input class="input" type="password" name="password" placeholder="请输入密码" />
            </div>
            <div class="form-item">
              <span class="form-item__label">
                <span class="required">*</span>邮　箱
              </span>
              <input class="input" type="text" name="email" placeholder="请输入邮箱" value="${user.email}" />
            </div>
            <div class="form-item">
              <span class="form-item__label">
                描　述
              </span>
              <textarea rows="3" class="input" name="desc" placeholder="请输入描述" value="${user.desc || ''}" >${user.desc || ''}</textarea>
            </div>
            <div class="form-item">
              <button class="button__primary userinfo-save-button" >保存</button>
            </div>
          </div>
        </div>
      `

      return template
    }

    function generateUser () {
      const userAvatar = user.avatar ? user.avatar : './images/bg.jpg'
      const userinfoHTML = `
        <img src="${userAvatar}" alt="头像" class="userinfo-avatar">
        <span class="userinfo-name" title="修改用户">${user.username}</span>
        <button class="button__primary quit-button">退出</button>
      `
      document.querySelector('.userinfo').innerHTML = userinfoHTML
    }

    function changeUserinfo () {
      const dialog = createDialog({ title: '修改用户信息', content: getTempate(user) })
      dialog.open().then(() => {
        const userinfoForm = document.querySelector('.userinfo-form')
        const saveButton = document.querySelector('.userinfo-save-button')
        saveButton.addEventListener('click', () => {
          const inputList = userinfoForm.querySelectorAll('.input')
          const params = {}
          inputList.forEach(input => {
            if (input.name) {
              params[input.name] = input.value
            }
          })

          params.avatar = user.avatar

          if (!params.username) {
            alert('缺少用户名！')
            return
          }

          if (!params.email) {
            alert('缺少邮箱！')
            return
          }

          ajax({
            method: 'put',
            url: baseURL + '/api/user/update',
            body: params
          }).then(res => {
            if (res.error) {
              alert(res.error.value)
              return
            }
            alert('更新成功！')
            localStorage.setItem('todo-user', JSON.stringify(res.data))
            generateUser()
            dialog.close()
          })
        })

        const avatarDom = document.querySelector('.form-item__avatar')
        const uploadInput = userinfoForm.querySelector('.upload-input')
        avatarDom.addEventListener('click', () => {
          uploadInput.click()
        })
        uploadInput.addEventListener('change', (e) => {
          const file = e.target.files[0]
          const formData = new FormData()
          formData.append('file', file)
          ajax({
            method: 'post',
            url: baseURL + '/api/user/uploadAvatar',
            body: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
          }).then(res => {
            if (res.error) {
              alert(res.error.value)
              return
            }
            alert('上传成功！')
            avatarDom.src = res.data
            user.avatar = res.data
          })
        })
      })
    }

    return {
      generateUser,
      changeUserinfo
    }
  }
)
