const { XPCOMUtils } = ChromeUtils.import(
  'resource://gre/modules/XPCOMUtils.jsm'
)

XPCOMUtils.defineLazyModuleGetters(this, {
  AddonManager: 'resource://gre/modules/AddonManager.jsm',
})

class Page {
  /**
   * A basic controller for individual pages
   * @param {string} id The id of the element that represents this page.
   */
  constructor(id) {
    this.element = document.getElementById(id)
    this.nextEl = document.getElementById(`${id}Next`)

    this.nextEl.addEventListener('click', () => {
      this.pages.next()
    })
  }

  /**
   *
   * @param {Pages} pages The pages wrapper
   */
  setPages(pages) {
    this.pages = pages
  }

  hide() {
    this.element.style.display = 'none'
  }

  show() {
    this.element.style.display = ''
  }
}

class Themes extends Page {
  constructor(id) {
    super(id)

    this.loadThemes()
  }

  async loadThemes() {
    const themes = (await AddonManager.getAddonsByTypes(['theme'])).filter(
      (theme) => !theme.id.includes('colorway')
    )
    const themeList = document.getElementById('themeList')

    const themeElements = []

    let selectedTheme = ''

    console.log(themes)

    themes.forEach((theme) => {
      const container = document.createElement('div')
      container.classList.add('card')

      if (theme.isActive) {
        container.classList.add('selected')
        selectedTheme = theme.id
      }

      container.addEventListener('click', () => {
        themeElements.forEach((el) => el.classList.remove('selected'))
        container.classList.add('selected')
        selectedTheme = theme.id
        theme.enable()
      })

      const img = document.createElement('img')
      img.src = theme.icons['32']
      img.classList.add('card-heading-image')

      const name = document.createElement('h3')
      name.textContent = theme.name

      container.appendChild(img)
      container.appendChild(name)

      themeList.appendChild(container)
      themeElements.push(container)
    })
  }
}

class Pages {
  /**
   * A wrapper around all pages
   * @param {Page[]} pages The pages
   */
  constructor(pages) {
    this.pages = pages
    this.currentPage = 0

    this.pages.forEach((page) => page.setPages(this))

    this._displayCurrentPage()
  }

  next() {
    this.currentPage++

    if (this.currentPage >= this.pages.length) {
      // We can use internal js apis to close the window
      close()
      return
    }

    this._displayCurrentPage()
  }

  _displayCurrentPage() {
    for (const page of this.pages) {
      page.hide()
    }

    this.pages[this.currentPage].show()
  }
}

const pages = new Pages([
  new Page('welcome'),
  new Page('import'),
  new Themes('theme'),
  new Page('search'),
])
