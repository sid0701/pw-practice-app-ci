import { test } from '@playwright/test'

// we can have page fixture or browser fixture
// page fixture represents a blank page
// think of it as, in order to run d test, we need to open a new page of a browser
test('first test', ({ page }) => {

    // first lets run the app by typing on terminal -> npm start
    page.goto('http://localhost:4200/')
    /**
     * Reason for failure
     * goto() method returns a Promise
     * Promise is a type of a Javascript method that can return 2 types of results
     * it can be successful result or unsuccesful result
     * When result is successful promise provides the result of the execution
     * If it is not successful the promise returns the error message
     * 
     * One more definition of promise is that it has a timeout of the execution
     * So promise can wait for the successful execution
     * and if we run the code like the way we did, the js or playwright just doesnt wait for
     * the promise to be executed
     * so we need promise to wait until it is going to be resolved
     *  */


})