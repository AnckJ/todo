(function () {
  const finishBtn = document.querySelector('.finish-button')
  finishBtn.addEventListener('click', finish)
  function finish () {
    if (checkedList.length < 1) {
      alert('请勾选已完成的内容')
      return
    }
    ajax({
      method: 'put',
      url: baseURL + '/update',
      body: { ids: checkedList, data: { status: 'completed' } }
    }).then(res => {
      if (res.error) {
        console.log(res.error)
        return
      }
      getList()
    })
  }
})()
