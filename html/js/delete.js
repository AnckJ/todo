(function () {
  const deleteBtn = document.querySelector('.delete-button')
  deleteBtn.addEventListener('click', del)

  function del () {
    if (checkedList.length < 1) {
      alert('请勾选需要删除的内容')
      return
    }
    ajax({
      method: 'delete',
      url: baseURL + '/todo/delete',
      body: { ids: checkedList }
    }).then(res => {
      if (res.error) {
        alert(res.error.value)
        return
      }
      getList()
    })
  }
})()
