import { test, expect } from '@playwright/test'

test('drag n drop with i frames', async ({ page }) => {

    await page.goto('https://globalsqa.com/demo-site/draganddrop/')

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