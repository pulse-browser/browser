// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//
// Note: You must have semicolons at the end of each line in user setting files

// Enable downloading drm
pref('media.eme.enabled', true);

// Disable firefox's about:welcome page
pref('browser.aboutwelcome.enabled', false);

pref('pulse.welcome.enabled', true);
pref('pulse.welcome.seen', false);

// Sidebar pref
pref('pulse.sidebar.enabled', true);
pref('pulse.sidebar.extensions.enabled', true);

//PIP pref
pref('media.videocontrols.picture-in-picture.audio-toggle.enabled', true);

// This preference tells the browser that our addons are preinstalled and should
// be provided with permissions without asking
// TODO: Documentation in melon for preference
pref('extensions.installedDistroAddon.newtab@browser.fushra.com', true);

pref('browser.discovery.enabled', false);
pref('svg.context-properties.content.enabled', true);

// Allow the user to install unsigned addons from sources like our custom addon
// store
pref('xpinstall.signatures.required', false);
// Allow the usage of theme experiments
pref('extensions.experiments.enabled', true);

#include better-fox.js
