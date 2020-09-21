define([
  'js/baseUrl',
  'js/ajax',
  'js/pagination'
], function (baseURL, ajax, generaterPagination) {
  const list = document.querySelector('.list')
  const size = 5
  let checkedList = []
  let currentPage = 1
  let queryParams = null

  /**
   * 获取todo列表
   */
  function getList (params = {}, page) {
    if (page !== undefined) {
      currentPage = page
    }
    queryParams = params
    checkedList = []
    ajax({
      method: 'post',
      url: baseURL + '/api/todo/list',
      body: { page: currentPage, size, ...params }
    }).then(res => {
      list.innerHTML = ''
      if (res.error) {
        location.href = '/login.html'
        return
      }
      const total = res.total
      // 生成分页组件
      generaterPagination({
        mount: '.pagination',
        currentPage,
        total
      })

      const data = res.data
      data.forEach(item => {
        const todoItem = createItem(item, false, item.status === 'completed')
        list.appendChild(todoItem)
      })
    })
  }
  /**
   * 创建todo-item
   */
  function createItem (item, immediately = false, isFinished = false) {
    const todoItem = document.createElement('li')
    todoItem.className = 'list-item'
    todoItem.dataset.id = item._id
    todoItem.innerHTML = getListItemInnerHTML(item.name, immediately, isFinished)
    todoItem.addEventListener('click', clickItem)

    const checkbox = todoItem.querySelector('.list-item__checkbox')
    checkbox.addEventListener('change', function () {
      getCheckedItem(todoItem.dataset.id)
    })
    return todoItem
  }
  /**
   *  点击todo-item，代理点击按钮事件
   */
  function clickItem (e) {
    const target = e.target
    const input = this.querySelector('.list-item__input')
    const name = this.querySelector('.list-item__name')
    const updateBtn = this.querySelector('.update-button')
    const saveBtn = this.querySelector('.save-button')

    if (target === updateBtn) {
      this.innerHTML = getListItemInnerHTML(name.innerText, true)
      return
    }
    if (target === saveBtn) {
      ajax({
        method: 'put',
        url: baseURL + '/api/todo/update',
        body: { _id: this.dataset.id, name: input.value }
      }).then(res => {
        if (res.error) {
          alert(res.error.value)
          return
        }
        getList()
      })
    }
  }
  /**
   * 获取todo-item的innerHTML
   */
  function getListItemInnerHTML (name, isEdit, isFinished = false) {
    return `
      <input type="checkbox" name="" class="list-item__checkbox" />
      <div class="list-item-div ${isEdit ? 'p-dib' : 'p-hide'}">
        <input type="text" value="${name}" class="list-item__input" />
        <button class="button__primary save-button">保存</button>
      </div>
      <div class="list-item-div ${!isEdit ? 'p-dib' : 'p-hide'}">
        <span class="list-item__name ${isFinished ? 'is-finished' : ''}">${name}</span>
        <button class="button__primary update-button">编辑</button>
      </div>
    `
  }
  /**
   * 获取勾选id列表
   */
  function getCheckedItem (id) {
    const index = checkedList.indexOf(id)
    if (index > -1) {
      checkedList.splice(index, 1)
    } else {
      checkedList.push(id)
    }
  }

  function prevPage () {
    currentPage--
    getList(queryParams)
  }
  function nextPage () {
    currentPage++
    getList(queryParams)
  }
  function jumpPage (num) {
    currentPage = num
    getList(queryParams)
  }

  function getCheckedList () {
    return checkedList
  }

  return {
    getCheckedList,
    getList,
    prevPage,
    nextPage,
    jumpPage
  }
})
