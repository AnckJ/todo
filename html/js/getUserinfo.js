define(function () {
  return function getUserinfo () {
    let user
    try {
      user = JSON.parse(localStorage.getItem('todo-user'))
    } catch (e) {
      console.log(e)
      location.href = '/login.html'
    }
    if (!user || !user._id) {
      location.href = '/login.html'
      return
    }
    return user
  }
})
