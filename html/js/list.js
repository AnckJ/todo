const baseURL = 'http://127.0.0.1:3000/api/todo'
const list = document.querySelector('.list')
const checkedList = []
const size = 5
let page = 1
let total = 0
let queryParams = null

getList()

/**
 * 获取todo列表
*/
function getList (params = {}) {
  queryParams = params
  ajax({
    method: 'post',
    url: baseURL + '/list',
    body: { page, size, ...params }
  }).then(res => {
    list.innerHTML = ''
    if (res.error) {
      alert(res.error)
      return
    }
    total = res.total
    // 生成分页组件
    genraterPagination({ currentPage: page })

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
  }
  if (target === saveBtn) {
    updateName(this.dataset.id, input.value)
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


const quitButton = document.querySelector('.quit-button')
quitButton.addEventListener('click', function () {
  localStorage.removeItem('todo-key')
  location.href = '/login.html'
})
