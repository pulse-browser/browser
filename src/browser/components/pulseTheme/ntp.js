ChromeUtils.defineModuleGetter(
    this,
    "LightweightThemeManager",
    "resource://gre/modules/LightweightThemeManager.jsm"
)

function loadPulseTheme() {
    let theme = LightweightThemeManager.currentThemeWithFallback
    const isPulse = theme.id.includes('pulse')

    if (isPulse) {
        const head = document.getElementById('head')
        head.innerHTML += `<link rel="stylesheet" href="chrome://browser/content/pulseTheme/ntp.css" />`
    }
}