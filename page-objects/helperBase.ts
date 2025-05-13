import { Page } from '@playwright/test'

export class HelperBase {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async waitForNumberOfSecs(numOfSecs: number) {
        await this.page.waitForTimeout(numOfSecs * 1000)
    }

}