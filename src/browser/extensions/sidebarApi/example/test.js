//@ts-check
/// <reference types="./sidebars.d.ts">

;(async () => {
  const testSidebar = browser.sidebars.add({
      title: 'Test',
      iconUrl: 'icon.svg',
      webviewUrl: 'test.html'
  })
})()
