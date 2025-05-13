import { test } from '@playwright/test'

// we can have page fixture or browser fixture
// page fixture represents a blank page
// think of it as, in order to run d test, we need to open a new page of a browser
test('first test', async ({ page }) => {

    // first lets run the app by typing on terminal -> npm start
    await page.goto('http://localhost:4200/')
    /**
     * await expressions can only be used in a asynchrnous function
     * so we need type keyword async
     */

    /**
     * for those methods which have a Promise as a return type
     * we need to provide keyword await 
     */

})