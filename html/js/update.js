function updateName (id, name) {
  ajax({
    method: 'put',
    url: baseURL + '/update',
    body: { _id: id, name }
  }).then(res => {
    if (res.error) {
      alert(res.error.value)
      return
    }
    getList()
  })
}
