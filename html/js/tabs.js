/**
 * tabs 功能
 */
define(['js/list'], function (list) {
  const tabs = document.querySelector('.tabs')
  tabs.addEventListener('click', function (e) {
    const name = e.target.dataset.name
    if (!name) return
    const tabList = this.querySelectorAll('.tab')
    tabList.forEach(tab => {
      tab.classList.remove('is-active')
    })
    e.target.classList.add('is-active')
    switchTab(name)
  })


  function switchTab (name) {
    if (name === 'all') {
      list.getList({}, 1)
      return
    }
    list.getList({ status: name }, 1)
  }
})
