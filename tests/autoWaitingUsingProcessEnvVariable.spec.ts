import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {

    /**
 *  Its very important concept to make ur test reliable n reduce flakiness
    Promise is a type of javascript function that can wait for the certain desired condition upto the limit of the timeout
    This concept is used by playwright to wait for the web element to be available on the page n interact with them
    
    example 1 :
    the textContent() method is waiting for the basicFormButton to be available so that it can take the text from this button n then we can make assertion
    const basicFormButtonValue = await basicFormButton.textContent()

    example 2 :
    the click() method waits for the basicFormButton to be available to perform the click
    the default timeout is 30 sec which can be configured
    await basicFormButton.click()

    If we look at the documentation - https://playwright.dev/docs/actionability
    Not all methods in it wait for all the conditions to be met

    For example:
    click() method waits for the element to be visible, stable, enabled etc
    but
    method selectText() waits only for Visible
    and if element is not stable for some reason, this method will be executed

    and also, u can see the number of methods that support this is pretty limited
    for example, 
    this list does not have method allTextContents() even though this is a promise, this command will not wait for any condition
    it will just run the test, n if some locator is not available, or not visible at the time of the execution of this command, this will create a flaky n unstable test

    we r going to use the following url ->
    uitestingplayground.com/ajax

    what is an ajax request?
    Asynchronous JavaScript and XML (Ajax, or AJAX) is a web development technique in which a web app fetches content from the server by making asynchronous HTTP requests, and uses the new content to update the relevant parts of the page without requiring a full page load.

    Read this article to understand the diff between synchronous n aysnc request
    https://stackoverflow.com/questions/5971301/determining-synchronous-vs-asynchronous-in-web-applications

    https://stackoverflow.com/questions/16715380/what-is-the-difference-between-asynchronous-and-synchronous-http-request


 */
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async ({ page }) => {

    const successButton = page.locator('.bg-success')

    /**
     * The playwright is trying to perform the click, but the button we r waiting for is not available yet as it takes 15 seconds for the button to come up after the inital button click
     * playwright patiently waits till 30 sec to perform the click n get the result
     */
    // await successButton.click()

    /**
     * we can also reduce the default timeout which is 30 sec
     * go to -> playwright.config.ts -> export default defineConfig -> timeout: 10000
     * now if we perform this click, it wil fail because the timeout has been reduced to 10 sec whereas it takes 15 seconds for that action to be performed
     * but lets comment this timeout so that d default timeout is 30 sec
     * and run the textContent() method -> this will also work since it waits for the button to load
     */

    // const text = await successButton.textContent()
    // expect(text).toEqual('Data loaded with AJAX get request.')

    /**
     * Now lets run allTextContent() method
     * Since this does not wait for element to be visible, it will throw an error immediately
     */
    // const text = await successButton.allTextContents()
    // expect(text).toEqual('Data loaded with AJAX get request.')

    /**
     * Now in such cases we can ask playwright to wait explicity
     */
    // await successButton.waitFor({ state: "attached" })
    // const text = await successButton.allTextContents()
    // expect(text).toContain('Data loaded with AJAX get request.')

    /**
     * the default timeout for locator assertion is 5 sec
     * hence the below code will fail
     */
    // await expect(successButton).toHaveText('Data loaded with AJAX get request.')

    /**
     * but we can override the timeout
     */
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 })

})

test('alternative waits', async ({ page }) => {

    const successButton = page.locator('.bg-success')

    //wait for element
    // await page.waitForSelector('.bg-success')

    /**
     * Wait for particular response
     * All the information on the web page displayed is coming from d backend server
     * N this info is coming from api
     * The info of interaction with api, is available on d network tab
     * Therefore, sometimes we can wait for d api call to be completed as well
     */
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    /**
     * Network calls to be completed (NOT RECOMMENDED)
     * We can use it sometimes to make sure all api calls were completed for ur app
     * But this is not recommended, because it will wait for all networking calls to be completed
     * N some of them may not be very imp for ur app
     */
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

})

