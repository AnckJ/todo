define([
  'js/baseUrl',
  'js/ajax',
  'js/list'
], function(baseURL, ajax, list) {
  /**
   * 添加功能
   */
  function insert (e) {
    if (e.code !== 'Enter' && e.which !== 13) {
      return
    }
    ajax({
      method: 'post',
      url: baseURL + '/api/todo/insert',
      body: { name: e.target.value }
    }).then(res => {
      if (res.error) {
        alert(res.error.value)
        return
      }
      this.value = ''
      list.getList()
    })
  }

  /**
   * 删除功能
   */
  function del () {
    const checkedList = list.getCheckedList()
    if (checkedList.length < 1) {
      alert('请勾选需要删除的内容')
      return
    }
    ajax({
      method: 'delete',
      url: baseURL + '/api/todo/delete',
      body: { ids: checkedList }
    }).then(res => {
      if (res.error) {
        alert(res.error.value)
        return
      }
      list.getList()
    })
  }

  /**
   * 已完成功能
   */
  function finish () {
    const checkedList = list.getCheckedList()
    if (checkedList.length < 1) {
      alert('请勾选已完成的内容')
      return
    }
    ajax({
      method: 'put',
      url: baseURL + '/api/todo/update',
      body: { ids: checkedList, data: { status: 'completed' } }
    }).then(res => {
      if (res.error) {
        console.log(res.error)
        return
      }
      list.getList()
    })
  }

  function updateName (id, name) {
    ajax({
      method: 'put',
      url: baseURL + '/api/todo/update',
      body: { _id: id, name }
    }).then(res => {
      if (res.error) {
        alert(res.error.value)
        return
      }
      list.getList()
    })
  }

  return {
    insert,
    del,
    finish,
    updateName
  }
})
