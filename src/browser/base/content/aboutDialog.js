// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
var { Services } = ChromeUtils.import('resource://gre/modules/Services.jsm')
var { AppConstants } = ChromeUtils.import(
  'resource://gre/modules/AppConstants.jsm'
)

function init(event) {
  document.getElementById('version').innerHTML =
    AppConstants.MOZ_APP_VERSION_DISPLAY
  document.getElementById('channel').innerHTML = Services.prefs.getCharPref(
    'app.update.channel',
    'Unknown'
  )

  console.log(AppConstants.MOZ_APP_VERSION_DISPLAY)
  console.log(Services.prefs.getCharPref('app.update.channel', 'Unknown'))
}

window.onload = () => setTimeout(() => init({}), 500)
