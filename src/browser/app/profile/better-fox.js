// Ignore license in this file
//
// The code in this file was created by @yokoffing and is licensed under the
// MIT license:
// MIT License
//
// Copyright (c) 2020 yokoffing
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

/* You may copy+paste this file and use it as it is.
 *
 * If you make changes to your about:config while the program is running, the
 * changes will be overwritten by the user.js when the application restarts.
 *
 * To make lasting changes to preferences, you will have to edit the user.js.
 */

/****************************************************************************
 * Betterfox                                                                *
 * "Ad meliora"                                                             *
 * version: 111                                                             *
 * url: https://github.com/yokoffing/Betterfox                              *
 ****************************************************************************/

/****************************************************************************
 * SECTION: FASTFOX                                                         *
 ****************************************************************************/
pref('nglayout.initialpaint.delay', 0);
pref('nglayout.initialpaint.delay_in_oopif', 0);
pref('content.notify.interval', 100000);
pref('browser.startup.preXulSkeletonUI', false);

/** EXPERIMENTAL ***/
pref('layout.css.grid-template-masonry-value.enabled', true);
pref('layout.css.animation-composition.enabled', true);
pref('dom.enable_web_task_scheduling', true);

/** GFX ***/
pref('gfx.webrender.all', true);
pref('gfx.webrender.precache-shaders', true);
pref('gfx.webrender.compositor', true);
pref('layers.gpu-process.enabled', true);
pref('media.hardware-video-decoding.enabled', true);
pref('gfx.canvas.accelerated', true);
pref('gfx.canvas.accelerated.cache-items', 32768);
pref('gfx.canvas.accelerated.cache-size', 4096);
pref('gfx.content.skia-font-cache-size', 80);
pref('image.cache.size', 10485760);
pref('image.mem.decode_bytes_at_a_time', 131072);
pref('image.mem.shared.unmap.min_expiration_ms', 120000);
pref('media.memory_cache_max_size', 1048576);
pref('media.memory_caches_combined_limit_kb', 2560000);
pref('media.cache_readahead_limit', 9000);
pref('media.cache_resume_threshold', 6000);

/** BROWSER CACHE ***/
pref('browser.cache.memory.max_entry_size', 153600);

/** NETWORK ***/
pref('network.buffer.cache.size', 262144);
pref('network.buffer.cache.count', 128);
pref('network.http.max-connections', 1800);
pref('network.http.max-persistent-connections-per-server', 10);
pref('network.ssl_tokens_cache_capacity', 32768);

/****************************************************************************
 * SECTION: SECUREFOX                                                       *
 ****************************************************************************/
/** TRACKING PROTECTION ***/
pref('browser.contentblocking.category', 'strict');
pref('privacy.trackingprotection.emailtracking.enabled', true);
pref(
  'urlclassifier.trackingSkipURLs',
  '*.reddit.com, *.twitter.com, *.twimg.com, *.tiktok.com'
);
pref(
  'urlclassifier.features.socialtracking.skipURLs',
  '*.instagram.com, *.twitter.com, *.twimg.com'
);
pref(
  'privacy.query_stripping.strip_list',
  '__hsfp __hssc __hstc __s _hsenc _openstat dclid fbclid gbraid gclid hsCtaTracking igshid mc_eid ml_subscriber ml_subscriber_hash msclkid oft_c oft_ck oft_d oft_id oft_ids oft_k oft_lk oft_sk oly_anon_id oly_enc_id rb_clickid s_cid twclid vero_conv vero_id wbraid wickedid yclid'
);
pref('browser.uitour.enabled', false);
pref('privacy.globalprivacycontrol.enabled', true);
pref('privacy.globalprivacycontrol.functionality.enabled', true);

/** OCSP & CERTS / HPKP ***/
pref('security.OCSP.enabled', 0);
pref('security.remote_settings.crlite_filters.enabled', true);
pref('security.pki.crlite_mode', 2);
pref('security.cert_pinning.enforcement_level', 2);

/** SSL / TLS ***/
pref('security.ssl.treat_unsafe_negotiation_as_broken', true);
pref('browser.xul.error_pages.expert_bad_cert', true);
pref('security.tls.enable_0rtt_data', false);

/** DISK AVOIDANCE ***/
pref('browser.cache.disk.enable', false);
pref('browser.privatebrowsing.forceMediaMemoryCache', true);
pref('browser.sessionstore.privacy_level', 2);

/** SHUTDOWN & SANITIZING ***/
pref('privacy.history.custom', true);

/** SPECULATIVE CONNECTIONS ***/
pref('network.http.speculative-parallel-limit', 0);
pref('network.dns.disablePrefetch', true);
pref('browser.urlbar.speculativeConnect.enabled', false);
pref('browser.places.speculativeConnect.enabled', false);
pref('network.prefetch-next', false);
pref('network.predictor.enabled', false);
pref('network.predictor.enable-prefetch', false);

/** SEARCH / URL BAR ***/
pref('browser.search.separatePrivateDefault.ui.enabled', true);
pref('browser.urlbar.update2.engineAliasRefresh', true);
pref('browser.search.suggest.enabled', false);
pref('browser.urlbar.suggest.quicksuggest.sponsored', false);
pref('browser.urlbar.suggest.quicksuggest.nonsponsored', false);
pref('security.insecure_connection_text.enabled', true);
pref('security.insecure_connection_text.pbmode.enabled', true);
pref('network.IDN_show_punycode', true);

/** HTTPS-FIRST MODE ***/
pref('dom.security.https_first', true);

/** PROXY / SOCKS / IPv6 ***/
pref('network.proxy.socks_remote_dns', true);
pref('network.file.disable_unc_paths', true);
pref('network.gio.supported-protocols', '');

/** PASSWORDS AND AUTOFILL ***/
pref('signon.formlessCapture.enabled', false);
pref('signon.privateBrowsingCapture.enabled', false);
pref('signon.autofillForms', false);
pref('signon.rememberSignons', false);
pref('editor.truncate_user_pastes', false);
pref('layout.forms.reveal-password-context-menu.enabled', true);

/** ADDRESS + CREDIT CARD MANAGER ***/
pref('extensions.formautofill.addresses.enabled', false);
pref('extensions.formautofill.creditCards.enabled', false);
pref('extensions.formautofill.heuristics.enabled', false);
pref('browser.formfill.enable', false);

/** MIXED CONTENT + CROSS-SITE ***/
pref('network.auth.subresource-http-auth-allow', 1);
pref('pdfjs.enableScripting', false);
pref('extensions.postDownloadThirdPartyPrompt', false);
pref('permissions.delegation.enabled', false);

/** HEADERS / REFERERS ***/
pref('network.http.referer.XOriginTrimmingPolicy', 2);

/** CONTAINERS ***/
pref('privacy.userContext.ui.enabled', true);

/** WEBRTC ***/
pref('media.peerconnection.ice.proxy_only_if_behind_proxy', true);
pref('media.peerconnection.ice.default_address_only', true);

/** SAFE BROWSING ***/
pref('browser.safebrowsing.downloads.remote.enabled', false);

/** MOZILLA ***/
pref('accessibility.force_disabled', 1);
pref('identity.fxaccounts.enabled', false);
pref('browser.tabs.firefox-view', false);
pref('permissions.default.desktop-notification', 2);
pref('permissions.default.geo', 2);
pref(
  'geo.provider.network.url',
  'https://location.services.mozilla.com/v1/geolocate?key=%MOZILLA_API_KEY%'
);
pref('geo.provider.ms-windows-location', false); // WINDOWS
pref('geo.provider.use_corelocation', false); // MAC
pref('geo.provider.use_gpsd', false); // LINUX
pref('geo.provider.use_geoclue', false); // LINUX
pref('permissions.manager.defaultsUrl', '');
pref('webchannel.allowObject.urlWhitelist', '');

/** TELEMETRY ***/
pref('toolkit.telemetry.unified', false);
pref('toolkit.telemetry.enabled', false);
pref('toolkit.telemetry.server', 'data:,');
pref('toolkit.telemetry.archive.enabled', false);
pref('toolkit.telemetry.newProfilePing.enabled', false);
pref('toolkit.telemetry.shutdownPingSender.enabled', false);
pref('toolkit.telemetry.updatePing.enabled', false);
pref('toolkit.telemetry.bhrPing.enabled', false);
pref('toolkit.telemetry.firstShutdownPing.enabled', false);
pref('toolkit.telemetry.coverage.opt-out', true);
pref('toolkit.coverage.opt-out', true);
pref('datareporting.healthreport.uploadEnabled', false);
pref('datareporting.policy.dataSubmissionEnabled', false);
pref('app.shield.optoutstudies.enabled', false);
pref('browser.discovery.enabled', false);
pref('breakpad.reportURL', '');
pref('browser.tabs.crashReporting.sendReport', false);
pref('browser.crashReports.unsubmittedCheck.autoSubmit2', false);
pref('captivedetect.canonicalURL', '');
pref('network.captive-portal-service.enabled', false);
pref('network.connectivity-service.enabled', false);
pref('default-browser-agent.enabled', false);
pref('app.normandy.enabled', false);
pref('app.normandy.api_url', '');
pref('browser.ping-centre.telemetry', false);
pref('browser.newtabpage.activity-stream.feeds.telemetry', false);
pref('browser.newtabpage.activity-stream.telemetry', false);

/****************************************************************************
 * SECTION: PESKYFOX                                                        *
 ****************************************************************************/
/** MOZILLA UI ***/
pref('layout.css.prefers-color-scheme.content-override', 2);
pref('toolkit.legacyUserProfileCustomizations.stylesheets', true);
pref('app.update.suppressPrompts', true);
pref('browser.compactmode.show', true);
pref('browser.privatebrowsing.vpnpromourl', '');
pref('extensions.getAddons.showPane', false);
pref('extensions.htmlaboutaddons.recommendations.enabled', false);
pref('browser.shell.checkDefaultBrowser', false);
pref('browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons', false);
pref(
  'browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features',
  false
);
pref('browser.preferences.moreFromMozilla', false);
pref('browser.tabs.tabmanager.enabled', false);
pref('browser.aboutwelcome.enabled', false);
pref('findbar.highlightAll', true);
pref('middlemouse.contentLoadURL', false);
pref('browser.privatebrowsing.enable-new-indicator', false);

/** FULLSCREEN ***/
pref('full-screen-api.transition-duration.enter', '0 0');
pref('full-screen-api.transition-duration.leave', '0 0');
pref('full-screen-api.warning.delay', 0);
pref('full-screen-api.warning.timeout', 0);

/** URL BAR ***/
pref('browser.urlbar.suggest.engines', false);
pref('browser.urlbar.suggest.topsites', false);
pref('browser.urlbar.suggest.calculator', true);
pref('browser.urlbar.unitConversion.enabled', true);

/** NEW TAB PAGE ***/
pref('browser.newtabpage.activity-stream.feeds.topsites', false);
pref('browser.newtabpage.activity-stream.feeds.section.topstories', false);

/*** POCKET ***/
pref('extensions.pocket.enabled', false);

/** DOWNLOADS ***/
pref('browser.download.useDownloadDir', false);
pref('browser.download.alwaysOpenPanel', false);
pref('browser.download.manager.addToRecentDocs', false);
pref('browser.download.always_ask_before_handling_new_types', true);

/** PDF ***/
pref('browser.download.open_pdf_attachments_inline', true);

/** TAB BEHAVIOR ***/
pref('browser.link.open_newwindow.restriction', 0);
pref('dom.disable_window_move_resize', true);
pref('browser.tabs.loadBookmarksInTabs', true);
pref('browser.bookmarks.openInTabClosesMenu', false);
pref('layout.css.has-selector.enabled', true);

/****************************************************************************
 * SECTION: SMOOTHFOX                                                       *
 ****************************************************************************/
// visit https://github.com/yokoffing/Betterfox/blob/master/Smoothfox.js
// Enter your scrolling prefs below this line:

/****************************************************************************
 * START: MY OVERRIDES                                                      *
 ****************************************************************************/
// Enter your personal prefs below this line:

/****************************************************************************
 * END: BETTERFOX                                                           *
 ****************************************************************************/
