import { test } from '../test-options-fixture-dependency'

// test.beforeEach(async ({ page }) => {
//     await page.goto('http://localhost:4200/')
// })

//after importing test from test-options, this test method will use extended version of test object that includes our fixture
//we need to pass our fixture as d argument
//with this we can comment before each n the step to navigate to form layout page, both of them r handled by this fixture

//after creating a pageManager fixture, we can use it here
test('testing form layouts page', async ({ pageManager }) => {

    //this is taken care of by pageManager fixture
    // const pm = new PageManager(page)

    //this is taken care of by formLayoutPage fixture
    // await navigateTo.formLayoutsPage()

    await pageManager.formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test1@test.com', 'test456', 'Option 2')
    await pageManager.formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('Sid', 'sid@123.com', false)
})

