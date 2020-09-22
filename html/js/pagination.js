define(function() {
  /**
   * 生成分页组件
   * @param {String} mount 节点className
   * @param {Number} pagerCount 页码按钮的数量，只能为奇数
   * @param {Number} currentPage 当前页
   * @param {Number} size 每页数量
   * @return {String} html 组件字符串
   */
  return function generaterPagination ({ mount, pagerCount = 7, currentPage = 1, size = 5, total = 0 }) {
    // 获取中间页码按钮数
    const halfPagerCount = (pagerCount - 1) / 2
    // 总页码数
    const pageCount = Math.ceil(total / size)
    // 显示折叠按钮
    let showPrevMore = false
    let showNextMore = false
    // 总页码数大于按钮数时才考虑显示折叠按钮
    if (pageCount > pagerCount) {
      if (currentPage > pagerCount - halfPagerCount) {
        showPrevMore = true
      }

      if (currentPage < pageCount - halfPagerCount) {
        showNextMore = true
      }
    }

    const array = []
    // 生成需要显示的页码数字数组
    if (showPrevMore && !showNextMore) {
      const startPage = pageCount - (pagerCount - 2)
      for (let i = startPage; i < pageCount; i++) {
        array.push(i)
      }
    } else if (!showPrevMore && showNextMore) {
      for (let i = 2; i < pagerCount; i++) {
        array.push(i)
      }
    } else if (showPrevMore && showNextMore) {
      const offset = Math.floor(pagerCount / 2) - 1
      for (let i = currentPage - offset ; i <= currentPage + offset; i++) {
        array.push(i)
      }
    } else {
      for (let i = 2; i < pageCount; i++) {
        array.push(i)
      }
    }

    const prevPager = `<li class="pagination-page pagination-prev ${currentPage === 1 ? 'disabled' : ''}">&lt;</li>`
    const nextPager = `<li class="pagination-page pagination-next ${currentPage === pageCount ? 'disabled' : ''}">&gt;</li>`
    const firstPager = `<li class="pagination-page ${currentPage === 1 ? 'is-current' : ''}">1</li>`
    const lastPager = `<li class="pagination-page ${currentPage === pageCount ? 'is-current' : ''}">${pageCount}</li>`
    const morePager = `<li class="pagination-page">···</li>`

    let pagers = ''
    array.forEach(item => {
      pagers += `<li class="pagination-page ${currentPage === item ? 'is-current' : ''}">${item}</li>`
    })

    // 生成字符串
    const htmlString = `
      ${ prevPager }
      ${ firstPager }
      ${ showPrevMore ? morePager : '' }
      ${ pagers }
      ${ showNextMore ? morePager : '' }
      ${ pageCount > 1 ? lastPager : '' }
      ${ nextPager }
    `
    if (mount) {
      document.querySelector(mount).innerHTML = htmlString
    }
    return htmlString
  }
})
