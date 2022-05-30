/**
 * Provides a more advanced sidebar api that allows for adding multiple sidebars
 * from a single addon
 */
declare namespace browser.sidebars {
  class Sidebar {
    extentionIndex: string
    title: string
    webviewUrl: string
    iconUrl: string
    browserStyle: boolean
  }
  
    /**
   * @param config All of the options available to the developer
   */
  function add(config: {
    /**
     * The title of the sidebar
     */
    title: string
    /**
     * The URL that will be displayed for this item. **Must we a web accessable resource**
     */
    iconUrl: string
    /**
     * The webview that will be displayed in the sidebar
     */
    webviewUrl: string
    /**
     * If the browser's stylesheet should be included within the sidebar
     */
    browserStyle?: boolean
  }): Promise<number>

  /**
   * Returns an array of all of the sidebars that are registered by the addon
   */
  function list(): Promise<number[]>

  /**
   * Returns the provided paramaters to the sidebar
   */
  function get(id: number): Promise<Sidebar>


}
