// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//
// Note: You must have semicolons at the end of each line in user setting files

// Betterfox has a lower priority than the prefs included in this file
#include better-fox.js

// Prefs from browser/branding/unofficial/prefs/firefox-branding.js:

// The time interval between checks for a new version (in seconds)
pref("app.update.interval", 86400); // 24 hours
// Give the user x seconds to react before showing the big UI. default=24 hours
pref("app.update.promptWaitTime", 86400);

// The number of days a binary is permitted to be old
// without checking for an update.  This assumes that
// app.update.checkInstallTime is true.
pref("app.update.checkInstallTime.days", 2);

// Give the user x seconds to reboot before showing a badge on the hamburger
// button. default=immediately
pref("app.update.badgeWaitTime", 0);

// Number of usages of the web console.
// If this is less than 5, then pasting code into the web console is disabled
pref("devtools.selfxss.count", 5);

// Betterfox overrides:
pref('identity.fxaccounts.enabled', true); // Enable firefox sync

// Enable importers for other browsers
pref('browser.migrate.vivaldi.enabled', true);
pref('browser.migrate.opera-gx.enabled', true);
pref('browser.migrate.opera.enabled', true);

// Enable downloading DRM.
pref('media.eme.enabled', true);

// Enable linux hardware video decoding. Note that this may cause a crash
// on start for some linux setups, for example, those that do not have DMA-BUF
// or VA-API. We should see if we can find a work around for those 
// crashes when they come up
pref('media.ffmpeg.vaapi.enabled', true);

// Disable firefox's about:welcome page
pref('browser.aboutwelcome.enabled', true);

pref('pulse.welcome.enabled', true);
pref('pulse.welcome.seen', false);

// Sidebar pref
pref('pulse.sidebar.enabled', true);
pref('pulse.sidebar.extensions.enabled', true);
pref('pulse.sidebar.keeptabsactive.enabled', true);


//PIP pref
pref('media.videocontrols.picture-in-picture.audio-toggle.enabled', true);

// This preference tells the browser that our addons are preinstalled and should
// be provided with permissions without asking
// TODO: Documentation in gluon for preference
pref('extensions.installedDistroAddon.extension@tabliss.io', true);

pref('browser.discovery.enabled', false);
pref('svg.context-properties.content.enabled', true);

// Allow the user to install unsigned addons from sources like our custom addon
// store
pref('xpinstall.signatures.required', false);
// Allow the usage of theme experiments
pref('extensions.experiments.enabled', true);

// Disable VPN promos
pref('browser.vpn_promo.enabled', false);

// Enable WebMIDI. This is still currently in testing inside of Firefox, but
// will also provide us with the benefit of more features
pref('dom.webmidi.enabled', true);

// Check for system add-on updates.
pref("extensions.systemAddon.update.url", "https://updates.pulsebrowser.app/browser/addons/%CHANNEL%/update.xml");
pref("extensions.systemAddon.update.enabled", true);

//Update Routes (Download page for manual download and Temperoraliy Discord Invite Link for Release Notes)
pref("app.update.url.manual", "https://pulsebrowser.app/download");
pref("app.update.url.details", "hhttps://pulsebrowser.app/download");
pref("app.releaseNotesURL", "https://discord.gg/Y3khyEtAgS");
pref("app.releaseNotesURL.aboutDialog", "https://discord.gg/Y3khyEtAgS");

// This pref needs to be here to not break context menus (GH#169)
pref("extensions.pocket.enabled", false);

// Reenable accessability. Should have a low enough performance impact with the
// changes in 113
//  0: auto-detect
//  1: force disable
// -1: force enable
pref('accessibility.force_disabled', 0);
