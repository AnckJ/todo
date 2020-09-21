define(function () {
  const dialogInstances = []
  /**
   * 弹出框
   */
  class Dialog {
    /**
     * 静态方法：关闭弹出框
     */
    static close () {
      const instances = dialogInstances.filter(item => item.show)
      let instance = instances[instances.length - 1]
      if (instance.type === 'confirm') {
        document.body.removeChild(instance.wrapper)
        dialogInstances.pop()
        instance = null
      } else {
        instance.show = false
        instance.wrapper.style.display = 'none'
      }
      Dialog.modal.style.zIndex = instance.zIndex - 2
      if (instances.length === 1) {
        Dialog.modal.style.display = 'none'
      }
    }

    static confirm (message, callback) {
      const contentHtml = `
        <div class="dialog-confirm">
          <div class="dialog-confirm__message">${message}</div>
          <div class="dialog-confirm__footer">
            <button class="button__primary dialog-confirm__confirm">确定</button>
            <button class="button__plain dialog-confirm__cancel">取消</button>
          </div>
        </div>
      `
      const confirmInstance = createDialog({
        title: '提示',
        content: contentHtml,
        type: 'confirm',
        width: '500px',
        top: '25vh'
      })
      confirmInstance.type = 'confirm'
      confirmInstance.open()
        .then(() => {
          document.querySelector('.dialog-confirm__confirm')
            .addEventListener('click', callback)
          document.querySelector('.dialog-confirm__cancel')
            .addEventListener('click', confirmInstance.close.bind(confirmInstance))
        })
      return confirmInstance
    }

    constructor ({
      title,
      content,
      type,
      width,
      top,
      zIndex
    }) {
      this.title = title
      this.content = content
      this.type = type
      this.width = width
      this.top = top
      this.isOpend = false
      this.zIndex = zIndex
      this.show = false

      if (!Dialog.modal) {
        Dialog.modal = document.createElement('div')
        Dialog.modal.className = 'dialog__modal'
        Dialog.modal.style.display = 'none'
        Dialog.modal.style.zIndex = this.zIndex
        document.body.appendChild(Dialog.modal)
      }

      this.dom = document.createElement('div')
      this.dom.className = 'dialog'
      this.wrapper = document.createElement('div')
      this.wrapper.className = 'dialog__wrapper'
      this.wrapper.style.zIndex = this.zIndex + 1
      this.wrapper.appendChild(this.dom)
    }

    open () {
      if (this.isOpend) {
        this.wrapper.style.display = 'block'
      } else {
        this.dom.style.width = this.width
        this.dom.style.marginTop = this.top

        const titleHtml = this.title
          ? `<div class="dialog-header">
              <div class="dialog-header__title">${this.title}</div>
              <div class="dialog-header__close-button">x</div>
            </div>
          `
          : ''
        const contentHtml = this.content
          ? `<div class="dialog-content">${this.content}</div>`
          : ''
        const html = `
          ${ titleHtml }
          ${ contentHtml }
        `
        this.dom.innerHTML = html
        document.body.appendChild(this.wrapper)
        this.initClose()
        this.isOpend = true
      }
      this.show = true
      Dialog.modal.style.zIndex = this.zIndex
      Dialog.modal.style.display = 'block'
      return Promise.resolve()
    }

    update (html) {
      this.dom.querySelector('.dialog-content')
        .innerHTML = html
    }

    initClose () {
      this.dom.addEventListener('click', (e) => {
        const btn = this.dom.querySelector('.dialog-header__close-button')
        if (e.target === btn) {
          this.close()
        }
      })
    }

    close () {
      Dialog.close()
    }
  }

  return function createDialog ({ title, content, width = '50vw', top = '5vh' }) {
    const zIndex = dialogInstances.length > 0
      ? dialogInstances[dialogInstances.length - 1].zIndex + 2
      : 1
    const instance = new Dialog({ title, content, width, top, zIndex: zIndex })
    dialogInstances.push(instance)
    return instance
  }
})
