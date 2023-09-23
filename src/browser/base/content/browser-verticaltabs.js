/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// @ts-check
///<reference types="gecko-types" />

const VERTICAL_TABS_POSITION = 'pulse.tabs.vertical'
const VERTICAL_TABS_COLLAPSE = 'pulse.tabs.vertical.collapse'
const VERTICAL_TABS_WIDTH = 'pulse.tabs.vertical.width'

const SHOW_CLOSE_BUTTON = 'pulse.tabs.show.close'
const SHOW_NEW_TAB = 'pulse.tabs.show.new'

/**
 * @param {HTMLElement} toInsertAfter This is the element that I want to insert content after
 * @param {HTMLElement} toInsert The element to insert
 *
 * @throws {Error} If the element you want me to base insertions on has no parent
 */
function insertAfter(toInsertAfter, toInsert) {
  const parent = toInsertAfter.parentNode

  if (!parent) {
    throw new Error(
      'The element you want me to base insertions on has no parent',
    )
  }

  if (toInsertAfter.nextSibling) {
    parent.insertBefore(toInsert, toInsertAfter.nextSibling)
  } else {
    parent.appendChild(toInsert)
  }
}

/**
 * Replace a tag with another tag with a different name
 * @param {string} tagName The new tag name
 * @param {HTMLElement?} initialTag The tag to be changed
 */
function changeXULTagName(tagName, initialTag) {
  if (!initialTag) return
  if (initialTag.tagName == tagName) return

  const newParent = document.createXULElement(tagName)

  for (const attr of initialTag.attributes)
    newParent.setAttribute(attr.name, attr.value)
  while (initialTag.firstChild) newParent.appendChild(initialTag.firstChild)

  initialTag.replaceWith(newParent)
}

var VerticalTabs = {
  /**
   * @return {Boolean} true if the vertical tabs feature is enabled.
   */
  get verticalTabsEnabled() {
    return Services.prefs.getBoolPref(VERTICAL_TABS_POSITION, false)
  },

  get showCloseButton() {
    return Services.prefs.getBoolPref(SHOW_CLOSE_BUTTON, true)
  },

  get showNewTab() {
    return Services.prefs.getBoolPref(SHOW_NEW_TAB, true)
  },

  /**
   * @return {HTMLElement?}
   */
  get tabsToolbar() {
    return document.getElementById('TabsToolbar')
  },

  /**
   * @return {HTMLElement?}
   */
  get titlebarContainer() {
    return document.getElementById('titlebar')
  },

  /**
   * @return {HTMLElement?}
   */
  get browserContainer() {
    return document.getElementById('browser')
  },

  /**
   * @return {HTMLElement?}
   */
  get splitter() {
    return document.getElementById('verticaltabs-splitter')
  },

  /**
   * @return {Boolean}
   */
  get browserCollapseTabs() {
    return Services.prefs.getBoolPref(VERTICAL_TABS_COLLAPSE, false)
  },

  /** @type {HTMLElement?} */
  arrowScrollbox: null,
  /** @type {HTMLElement?} */
  tabBrowserTabs: null,

  _initialized: false,
  /** @type {MutationObserver?} */
  _widthObserver: null,

  /** @type {boolean} */
  isFullScreen: false,

  init() {
    if (this._initialized) {
      return
    }

    this.arrowScrollbox = document.getElementById('tabbrowser-arrowscrollbox')
    this.tabBrowserTabs = document.getElementById('tabbrowser-tabs')

    Services.prefs.addObserver(VERTICAL_TABS_POSITION, this)
    Services.prefs.addObserver(SHOW_CLOSE_BUTTON, this)
    Services.prefs.addObserver(SHOW_NEW_TAB, this)

    document.documentElement.setAttribute(
      'show-tab-close',
      this.showCloseButton ? 'true' : 'false',
    )
    document.documentElement.setAttribute(
      'show-tab-new',
      this.showNewTab ? 'true' : 'false',
    )

    if (this.verticalTabsEnabled) {
      this.enableVerticalTabs()
    }

    // Cause middle click to open a new tab
    this.arrowScrollbox?.addEventListener('click', (event) => {
      if (event.button != 1 || event.target != this.arrowScrollbox) return
      gBrowser.handleNewTabMiddleClick(this.arrowScrollbox, event)
    })

    addEventListener('fullscreen', this, true)
    window.addEventListener('mousemove', (e) => {
      // We can ignore mouse move events when:
      // - We are not in fullscreen
      // - Vertical tabs are disabled (this logic is handled elsewher )
      // - We are in fullscreen because of a document element (e.g. a video)
      if (
        !window.fullScreen ||
        !this.verticalTabsEnabled ||
        document.fullscreenElement
      )
        return
      const tabsToolbar = this.tabsToolbar
      if (!tabsToolbar) return

      const tabsWidth = tabsToolbar.clientWidth
      // If not hovering over the expanded tabs, we should collpase them
      if (e.clientX > tabsWidth) return this.fsMethods.collapse()
      // If towards the edge of the screen, the tabs should be reexpanded
      if (e.clientX == 0) return this.fsMethods.expand()
    })

    this._initialized = true
  },

  enableVerticalTabs() {
    this.browserContainer?.prepend(this.tabsToolbar || '')

    this.arrowScrollbox?.setAttribute('orient', 'vertical')
    this.tabBrowserTabs?.setAttribute('orient', 'vertical')

    document
      .getElementById('navigator-toolbox-background')
      ?.setAttribute('verticaltabs', 'true')
    document
      .querySelector('#TabsToolbar .toolbar-items')
      ?.setAttribute('align', 'start')

    this.tabsToolbar?.setAttribute(
      'collapse',
      this.browserCollapseTabs ? 'true' : 'false',
    )
    this.tabsToolbar?.removeAttribute('flex')
    changeXULTagName('vbox', this.tabsToolbar)

    this._widthObserver = new MutationObserver(this._mutationObserverCallback)
    if (this.tabsToolbar)
      this._widthObserver.observe(this.tabsToolbar, { attributes: true })

    this.tabsToolbar?.setAttribute(
      'width',
      Services.prefs.getIntPref(VERTICAL_TABS_WIDTH, 200),
    )
    if (this.tabsToolbar)
      this.tabsToolbar.style.width = `${Services.prefs.getIntPref(
        VERTICAL_TABS_WIDTH,
        200,
      )}px`

    if (!this.splitter) {
      const separator = document.createXULElement('splitter')
      separator.setAttribute('id', 'verticaltabs-splitter')
      separator.setAttribute(
        'class',
        'chromeclass-extrachrome verticaltabs-splitter',
      )
      separator.setAttribute('resizebefore', 'sibling')
      separator.setAttribute('resizeafter', 'none')

      const tabs = this.tabsToolbar
      if (tabs) insertAfter(tabs, separator)
    }
  },

  disableVerticalTabs() {
    this.titlebarContainer?.prepend(this.tabsToolbar || '')

    this.arrowScrollbox?.setAttribute('orient', 'horizontal')
    this.tabBrowserTabs?.setAttribute('orient', 'horizontal')

    document
      .getElementById('navigator-toolbox-background')
      ?.removeAttribute('verticaltabs')
    document
      .querySelector('#TabsToolbar .toolbar-items')
      ?.setAttribute('align', 'end')

    if (this.tabsToolbar) {
      changeXULTagName('toolbar', this.tabsToolbar)
      this.tabsToolbar.setAttribute('flex', '1')
      // Reset the resize value, or else the tabs will end up squished
      this.tabsToolbar.style.width = ''
    }

    if (this.splitter) {
      this.splitter.remove()
    }

    if (this._widthObserver) {
      this._widthObserver.disconnect()
      this._widthObserver = null
    }
  },

  handleEvent(event) {
    switch (event.type) {
      case 'fullscreen':
        if (window.fullScreen) this.fsMethods.collapse()
        else this.fsMethods.expand()
        break
    }
  },

  fsMethods: {
    isCollapsed: false,
    get parent() {
      return VerticalTabs
    },

    collapse() {
      if (this.isCollapsed) return
      this.isCollapsed = true

      // Set the margin to hide the tabs of the side of the screen
      if (!this.parent.tabsToolbar || !this.parent.splitter) return
      this.parent.tabsToolbar.style.marginLeft =
        -(
          this.parent.tabsToolbar.clientWidth + this.parent.splitter.clientWidth
        ) + 'px'
    },

    expand() {
      if (!this.isCollapsed) return
      this.isCollapsed = false

      // Reset left margin
      if (!this.parent.tabsToolbar) return
      this.parent.tabsToolbar.style.marginLeft = ''
    },
  },

  /**
   * @param {MutationRecord[]} mutationsList
   * @param {MutationObserver} _observer
   */
  _mutationObserverCallback(mutationsList, _observer) {
    const browserCollapseTabs = Services.prefs.getBoolPref(
      VERTICAL_TABS_COLLAPSE,
      false,
    )
    const tabsToolbar = document.getElementById('TabsToolbar')
    if (browserCollapseTabs) {
      return
    }
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName == 'width') {
        Services.prefs.setIntPref(
          VERTICAL_TABS_WIDTH,
          parseInt(tabsToolbar?.getAttribute('width') || '100'),
        )
      }
    }
  },

  /**
   * The handler for `Services.prefs.addObserver`.
   */
  observe(_subject, topic, data) {
    switch (topic) {
      case 'nsPref:changed':
        if (data === VERTICAL_TABS_POSITION) {
          if (this.verticalTabsEnabled) {
            this.enableVerticalTabs()
          } else {
            this.disableVerticalTabs()
          }
        }
        if (data === VERTICAL_TABS_COLLAPSE) {
          document
            .getElementById('TabsToolbar')
            ?.setAttribute(
              'collapse',
              this.browserCollapseTabs ? 'true' : 'false',
            )
        }

        if (data === SHOW_CLOSE_BUTTON || data === SHOW_NEW_TAB) {
          document.documentElement.setAttribute(
            'show-tab-close',
            this.showCloseButton ? 'true' : 'false',
          )
          document.documentElement.setAttribute(
            'show-tab-new',
            this.showNewTab ? 'true' : 'false',
          )
        }

        break
    }
  },
}
