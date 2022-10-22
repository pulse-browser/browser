// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// @ts-check

'use strict'

var EXPORTED_SYMBOLS = ['ContextMenu']

/**
 * @typedef Item
 * @property {string} l10nId The internationalisation id
 * @property {string} callId The id that will be passed through to the new events
 */

/**
 * @callback ContextMenuEvent
 * @param {string} callId An id specified to identify the callback
 */

let contextMenuIndex = 0

/**
 * A context menu wrapper
 */
class ContextMenu {
  /**
   * @param {Item[]} items
   */
  constructor(items) {
    this.items = items
    this.id = contextMenuIndex++

    this.activatorTarget = null
    this.events = []
  }

  addToBrowser(window) {
    const {document} = window

    const popup = window.document.createXULElement('menupopup')
    
    popup?.setAttribute('id', this.contextMenuId)

    popup?.addEventListener('onpopupshowing', (event) => {
      this.activatorTarget = aPopupMenu.triggerNode
    })
    popup?.addEventListener('onpopuphidden', () => {
      this.activatorTarget = null
    })

    this.items.forEach((item, index) => {
      const itemEl = window.document.createXULElement('menuitem')
      itemEl?.setAttribute(
        'id',
        `pulseInternalContextMenu${this.id}Item${item.callId}`
      )

      window.document.l10n.setAttributes(itemEl, item.l10nId)

      itemEl?.addEventListener('command', () => {
        this.events.forEach((event) => {
          event(item.callId)
        })
      })

      popup.appendChild(itemEl)
    })

    window.document.getElementById('mainPopupSet')?.appendChild(popup)
  }

  get contextMenuId() {
    return `pulseInternalContextMenu${this.id}`
  }

  /**
   * @param {ContextMenuEvent} eventCallback
   */
  addEvent(eventCallback) {
    this.events.push(eventCallback)
  }
}
