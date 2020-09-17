function updateName (id, name) {
  ajax({
    method: 'put',
    url: baseURL + '/todo/update',
    body: { _id: id, name }
  }).then(res => {
    if (res.error) {
      alert(res.error.value)
      return
    }
    getList()
  })
}
