// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// TODO: Make this file publicly available

declare abstract class ExtensionAPI {
    constructor(extention: unknown)

    /**
     * The id given to the webextention, either by firefox or by the extention
     * manifest
     */
    public id: string

    abstract getAPI(context: unknown): Record<string, Record<string, any> | any>
}

declare global {
    interface Document {
        createXULElement: (type: string) => HTMLElement
    }
}

declare namespace ChromeUtils {
    function defineModuleGetter(currentScope: any, exportName: string, url: string)
    function import(path: string)
}
