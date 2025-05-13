import { test as base } from '@playwright/test'
import { PageManager } from './page-objects/pageManager'

export type TestOptions = {
    globalsQaURL: string
    formLayoutPage: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    //we can either provide a default value or keep an empty string for globalsQaURL
    //we will keep it empty string as a placeholder, n we will override this value later on inside the config file
    globalsQaURL: ['', { option: true }],

    formLayoutPage: [async ({ page }, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        //in order to activate this fixture, we need to use a keyword 'use'
        //n inside we need to provide d argument of d string, in our case it will be simple empty string
        //because we wont use this value for anything
        await use('')
    }, { auto: true }],

    pageManager: async ({ page }, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }
})