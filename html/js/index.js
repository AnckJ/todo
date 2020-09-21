require([
  'js/operation',
  'js/list',
  'js/userinfo'
], function (operation, list, userinfo) {
  require(['js/tabs'])

  // 初始化列表
  list.getList()

  /* 注册分页组件按钮事件 --- start */
  document.querySelector('.pagination')
    .addEventListener('click', function (e) {
      const classList = e.target.classList
      if (classList.contains('pagination-prev') && !classList.contains('disabled')) {
        list.prevPage()
        return
      }
      if (classList.contains('pagination-next') && !classList.contains('disabled')) {
        list.nextPage()
        return
      }
      if (classList.contains('pagination-page')) {
        let num = Number(e.target.innerHTML)
        if (!num) {
          num = Number(e.target.previousElementSibling.innerHTML) + 1
        }
        list.jumpPage(num)
      }
  })
  /* 注册分页组件按钮事件 --- end */

  /* 注册用户信息相关事件 --- start */
  document.querySelector('.userinfo')
    .addEventListener('click', function (e) {
      const quitButton = document.querySelector('.quit-button')
      const userinfoName = document.querySelector('.userinfo-name')
      if (e.target === quitButton) {
        localStorage.removeItem('todo-key')
        localStorage.removeItem('todo-user')
        location.href = '/login.html'
      }
      if (e.target === userinfoName) {
        userinfo.changeUserinfo()
      }
    })
  /* 注册用户信息相关事件 --- end */

  /* 注册操作事件 --- start */
  // 添加
  document.querySelector('.add-input')
    .addEventListener('keydown', operation.insert)
  // 删除
  document.querySelector('.delete-button')
    .addEventListener('click', operation.del)
  // 完成
  document.querySelector('.finish-button')
    .addEventListener('click', operation.finish)
  /* 注册操作事件 --- end */
})

