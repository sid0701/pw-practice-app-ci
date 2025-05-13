import { expect } from '@playwright/test'
//we r importing test from test-options because inside of that we have already imported test from @playwright/test
//then we made some modifications n now we r importing this from test-options
//so this test has some additional features that we provided inside test-options
import { test } from '../test-options'

test('drag n drop with i frames', async ({ page, globalsQaURL }) => {

    await page.goto(globalsQaURL)

    if (await page.locator('.fc-dialog-headline').isVisible()) {
        await page.getByRole('button', { name: 'Consent' }).click()
        await page.waitForSelector('h1')
    }


    /**
     * iframe - it is an embedded html doc inside of an exisitng html doc
     * so its kind of a website inside of a website
     * u can figure that out by html n body tags
     * every html website has a single body tag
     * 
     * in order to locate any elements inside an iframe
     * first we need to switch to d iframe n then within this iframe, locate d elements
     */
    const myIframe = page.frameLocator('[rel-title="Photo Manager"] iframe')
    await myIframe.locator('li', { hasText: 'High Tatras 2' }).dragTo(myIframe.locator('#trash'))

    //more precise control
    await myIframe.locator('li', { hasText: 'High Tatras 4' }).hover()
    await page.mouse.down()
    await myIframe.locator('#trash').hover()
    await page.mouse.up()

    await expect(myIframe.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4'])

})