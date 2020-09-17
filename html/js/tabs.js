/**
 * tabs 功能
 */
(function () {
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
    page = 1
    if (name === 'all') {
      getList()
      return
    }
    getList({ status: name })
  }
})()
