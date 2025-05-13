import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('general locators demo', async ({ page }) => {

    /**
     * Now we dont need to use await with them because the locator does not
     * return Promise, but when we use click() method with it, we have to use
     * await as it returns a Promise
     */

    //by tag name 
    //this will not return a unique value
    page.locator('input')

    //by ID
    page.locator('#inputEmail1')

    //by Class value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]')

    //by Xpath (NOT Recommended)
    page.locator('//*[@id="inputEmail1"]')

    await page.locator('input').first().click()

})

test('User-Facing locators', async ({ page }) => {

    await page.getByRole('textbox', { name: "Email" }).first().click()
    await page.getByRole('button', { name: "Sign in" }).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByTitle('IoT Dashboard').click()

    await page.getByText('Using the Grid').click()

    /**
     * TestId is the identifier that u can define by yourself in the source code
     * This is considered a good practise when u have a dedicated attribute as TestId's in your app
     * This helps to make ur app resilient
     * But still its not user facing locator
     * BUt still using test id's can make ur code resilient
     * How to use test id's?
     * One example
     * 1. Go to Search on VS Code left side navigation
     * 2. Search for Sign in 
     * 3. Click on form-layouts.component.html
     * 4. lets say u want to add an extra attribute data-testid to a button tag
     * 5. <button data-testid="SignIn" type="submit" nbButton status="primary">Sign in</button>
     * 6. data-testid is a reserved keyword
     * 7. if u want to change it, u can override it in settings
     * 
     */
    await page.getByTestId('SignIn').click()

})

test('working with child elements', async ({ page }) => {

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    //using a mix of general n user facing locators
    await page.locator('nb-card').getByRole('button', { name: "Sign in" }).first().click()

    //not recommended
    await page.locator('nb-card').nth(3).getByRole('button').click()


})

test('working with parent elements', async ({ page }) => {

    //sometimes we dont want to use methods like first() because it make our test flaky as developer might change the positions
    //in this case we should be able to search elements uniquely n something which will exist even if developer makes some changes to the html doc

    //this will find tag nb-card which has a text 'Using the grid anywhere within it'
    await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" }).click()

    //this will find nb-card which has this element within it
    await page.locator('nb-card', { has: page.locator('#inputPassword2') }).getByRole('textbox', { name: "Password" }).click()

    await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: "Email" }).click()
    await page.locator('nb-card').filter({ has: page.locator(".status-danger") }).getByRole('textbox', { name: "Password" }).click()

    /**
     * Now even though we have this filtering capability within locator() method
     * why do we still need filter() method
     * because
     * we can use this filter() method with other methods like getByRole() as well which does not have this filtering capability
     * also we can use multiple filter() methods to refine our search
     */
    await page.locator('nb-card').filter({ has: page.locator('nb-checkbox') }).filter({ hasText: "Sign in" })
        .getByRole('textbox', { name: "Email" }).click()

    //using xpath - not recommended
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: "Email" }).click()

})

test('reusing locators', async ({ page }) => {

    const basicFormDialogBox = page.locator('nb-card').filter({ hasText: "Basic form" })
    const emailField = basicFormDialogBox.getByRole('textbox', { name: "Email" })

    await emailField.fill("test@test.com")
    await basicFormDialogBox.getByRole('textbox', { name: "Password" }).fill('Welcome123')
    await basicFormDialogBox.locator('nb-checkbox').click()
    await basicFormDialogBox.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')

})

test('extracting values', async ({ page }) => {
    const basicFormDialogBox = page.locator('nb-card', { hasText: "Basic form" })

    //single text value
    const buttonName = await basicFormDialogBox.getByRole('button').textContent()
    expect(buttonName).toEqual('Submit')

    //all text value
    const usingGridDialogBox = page.locator('nb-card').filter({ hasText: "Option 1" })
    const allOptionNames = await usingGridDialogBox.locator('nb-radio').allTextContents()
    expect(allOptionNames).toContain("Option 2")

    //input value
    const emailField = basicFormDialogBox.locator('#exampleInputEmail1')
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual("test@test.com")

    const placeholderValue = await basicFormDialogBox.getByRole('textbox', { name: "Password" }).getAttribute('placeholder')
    expect(placeholderValue).toEqual("Password")

})

test('assertions', async ({ page }) => {

    const basicFormButton = page.locator('nb-card', { hasText: "Basic form" }).getByRole('button')

    //General assertions
    const value = 5
    expect(value).toEqual(5)

    const basicFormButtonValue = await basicFormButton.textContent()
    expect(basicFormButtonValue).toEqual('Submit')

    //Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //Soft assertion
    await expect.soft(basicFormButton).toHaveText('Button')
    await basicFormButton.click()

})