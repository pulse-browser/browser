/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const VERTICAL_TABS_POSITION = 'browser.tabs.verticalPosition'

var VerticalTabs = {
  /**
   * @return {Boolean} true if the vertical tabs feature is enabled.
   */
  get verticalTabsEnabled() {
    return Services.prefs.getBoolPref(VERTICAL_TABS_POSITION, false)
  },

  /**
   * @return {HTMLElement}
   */
  get tabsToolbar() {
    return document.getElementById('TabsToolbar')
  },

  /**
   * @return {HTMLElement}
   */
  get titlebarContainer() {
    return document.getElementById('titlebar')
  },

  /**
   * @return {HTMLElement}
   */
  get browserContainer() {
    return document.getElementById('browser')
  },

  arrowScrollbox: null,
  tabBrowserTabs: null,

  init() {
    this.arrowScrollbox = document.getElementById('tabbrowser-arrowscrollbox')
    this.tabBrowserTabs = document.getElementById('tabbrowser-tabs')

    Services.prefs.addObserver(VERTICAL_TABS_POSITION, this)

    if (this.verticalTabsEnabled) {
      this.enableVerticalTabs()
    }
  },

  enableVerticalTabs() {
    console.log('enableVerticalTabs')

    this.browserContainer.prepend(this.tabsToolbar)

    setTimeout(() => {
      this.arrowScrollbox.setAttribute('orient', 'vertical')
      this.tabBrowserTabs.setAttribute('orient', 'vertical')
    }, 50)

    this.resetTabBrowser()
  },

  disableVerticalTabs() {
    console.log('disableVerticalTabs')

    this.titlebarContainer.prepend(this.tabsToolbar)

    setTimeout(() => {
      this.arrowScrollbox.setAttribute('orient', 'horizontal')
      this.tabBrowserTabs.setAttribute('orient', 'horizontal')
    }, 50)

    this.resetTabBrowser()
  },

  resetTabBrowser() {
    delete window.gBrowser._tabs
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
        break
    }
  },
}
