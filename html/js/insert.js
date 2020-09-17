/**
 * 添加功能
 */
(function () {
  const addInput = document.querySelector('.add-input')
  addInput.addEventListener('keydown', function (e) {
    if (e.code !== 'Enter' && e.which !== 13) {
      return
    }
    ajax({
      method: 'post',
      url: baseURL + '/todo/insert',
      body: { name: e.target.value }
    }).then(res => {
      if (res.error) {
        alert(res.error.value)
        return
      }
      this.value = ''
      getList()
    })
  })
})()
