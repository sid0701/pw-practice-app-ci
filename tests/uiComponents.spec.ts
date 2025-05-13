import { test, expect } from '@playwright/test'
import { log } from 'console'

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/")
})

test.describe('Main Page', () => {
    test('list n dropdowns', async ({ page }) => {
        /**
         * Visually if u look at this element, it looks like a box with 4 items belongs to d box of d selector, but it is actually not
         * if u see the tag button, u will see the actual elements r not here, i.e they r not d child elements of this button tag
         */

        const dropdownButton = page.locator('ngx-header nb-select')
        await dropdownButton.click()

        /**
         * should be used when the list has a UL tag, list represents d parent container for d entire list */
        // page.getByRole('list')

        /**
         * should be used when the list has a LI tag, it will give u all d list items from d list n will represent d array of list of d list elements 
         * 
         * in this example, we dont have li elements, we have 4 nb-option, we have a diff library probably used here, so we cannot use listitem
         * */
        // page.getByRole('listitem')

        // const dropdownOptions = page.getByRole('list').locator('nb-option')
        const dropdownOptions = page.locator('nb-option-list nb-option')
        expect(dropdownOptions).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
        await dropdownOptions.filter({ hasText: 'Cosmic' }).click()

        /**
         * How to assert the colour of the webpage
         * lets inspect d dom
         * our full header is -> nb-layout-header
         * now go to styles n properties panel on d right side 
         * find out d 'nb-layout-header'
         * n find out d element 'background-color'
         */
        const backgroundColour = page.locator('nb-layout-header')
        await expect(backgroundColour).toHaveCSS('background-color', 'rgb(50, 50, 89)')

        //This is an object
        const colors = {
            'Light': 'rgb(255, 255, 255)',
            'Dark': 'rgb(34, 43, 69)',
            'Cosmic': 'rgb(50, 50, 89)',
            'Corporate': 'rgb(255, 255, 255)'

        }

        await dropdownButton.click()
        for (const color in colors) {
            await dropdownOptions.filter({ hasText: color }).click()
            await expect(backgroundColour).toHaveCSS('background-color', colors[color])

            if (color != 'Corporate')
                await dropdownButton.click()
        }
    })

    test('sliders - updating attribute', async ({ page }) => {

        const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
        await tempGauge.evaluate(node => {
            node.setAttribute('cx', '232.630')
            node.setAttribute('cy', '232.630')
        })

        await tempGauge.click()

    })

    test('sliders - mouse movement', async ({ page }) => {

        const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')

        //this method will make sure that our page scrolls down appropriately
        await tempBox.scrollIntoViewIfNeeded()

        /**
         * when u call boundingbox() method for this web element, 
         * this is nothing but a bounding box of 300*300
         * playwright creates coordinate around this bounding box with x n y coordinates
         * if u want to put ur mouse pointer to 100 pixels
         * we say x=0, y=100, n our mouse will move down to this point
         * u r not limited to this bounding box, u can go outside of this bounding box
         * this is just d starting point for u to move d mouse around
         * if u want to move ur mouse out of bounding box just provide negative value for x or y
         * X=100, Y=-50
         * d only limit for moving ur mouse around is d actual browser view
         * for more info check image in d word doc
         * 
         * for ur convienience, it will be beter if we use d center of d box as our starting point
         * instead of out of the box
         */
        const box = await tempBox.boundingBox()
        const x = box.x + box.width / 2
        const y = box.y + box.height / 2
        await page.mouse.move(x, y)

        //this simulates clicking of the left key of d mouse    
        await page.mouse.down()

        await page.mouse.move(x + 100, y)
        await page.mouse.move(x + 100, y + 100)

        //this is releasing d mouse
        await page.mouse.up()

        await expect(tempBox).toContainText('30')

    })
})

test.describe('Forms', () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
    })

    test.describe('Form Layout', () => {

        test.beforeEach(async ({ page }) => {
            await page.getByText('Form Layouts').click()
        })

        test('input fields', async ({ page }) => {

            const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: 'Email' })

            await usingTheGridEmailInput.fill('test@test.com')
            await usingTheGridEmailInput.clear()

            /** 
             * -	pressSequentially() -> this method can delay between 2 keystrokes, if for some reason in your test scenario, u want to simulate slower typing into the input field
            -	u can simulate that as well using -> pressSequentially(‘test2@test.com’, {delay: 500})
             */

            await usingTheGridEmailInput.pressSequentially('test2@test.com', { delay: 500 })

            //generic assertion
            const valueInputted = await usingTheGridEmailInput.inputValue()
            expect(valueInputted).toEqual('test2@test.com')

            //locator assertion
            await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')

        })

        test('radio buttons', async ({ page }) => {

            /**
             * the check() method wont work since the radio button is marked as visually hidden in the class attribute
             * because of this check command wont pass the default checks such as element should be visible, clickable n so on, so playwright wont be select this element
             * in order to bypass this validation of availability we need to pass parameter check({force: true}), by this we r disabling d verification of diff status that check is waiting for, so we r literally clicking on this input field
             */

            const usingTheGridDialog = page.locator('nb-card', { hasText: "Using the Grid" })
            // const radioOption1 = usingTheGridDialog.getByLabel('Option 1')
            const radioOption1 = usingTheGridDialog.getByRole('radio', { name: "Option 1" })
            const radioOption2 = usingTheGridDialog.getByRole('radio', { name: "Option 2" })

            await radioOption2.check({ force: true })

            //General Assertion
            const radioStatusOption1 = await radioOption1.isChecked()
            const radioStatusOption2 = await radioOption2.isChecked()
            expect(radioStatusOption1).toBeFalsy()
            expect(radioStatusOption2).toBeTruthy()

            //Locator Assertion
            await expect(radioOption2).toBeChecked()
        })

        test('radio buttons with visual testing', async ({ page }) => {

            /**
             * the check() method wont work since the radio button is marked as visually hidden in the class attribute
             * because of this check command wont pass the default checks such as element should be visible, clickable n so on, so playwright wont be select this element
             * in order to bypass this validation of availability we need to pass parameter check({force: true}), by this we r disabling d verification of diff status that check is waiting for, so we r literally clicking on this input field
             */

            const usingTheGridDialog = page.locator('nb-card', { hasText: "Using the Grid" })
            // const radioOption1 = usingTheGridDialog.getByLabel('Option 1')
            await usingTheGridDialog.getByRole('radio', { name: "Option 2" }).check({ force: true })

            //in order to make a visual comparison against d snapshot
            //1st we need to create a snapshot of d webelement for which we want to make an assertion
            //this method will generate a screenshot as a baseline or a golden screenshot that will be used later for the comparison
            await expect(usingTheGridDialog).toHaveScreenshot()

            // now once we run this test for d 1st time, this test will fail and a new folder with the name of the spec file uiComponents.spec.ts will be created with our screeshot

            //when we run d test for 2nd time, it will compare d new screenshot with d exisiting screenshot

            // if lets say we make any changes in our expected result so that it does not match our existing screenshot, the test will fail

            // test -results will now have 3 screenshots under the spec folder
            // 1st the expected
            //2nd the actual
            //3rd the difference between the expected n actual

        })
    })

    test.describe('Date Picker', () => {

        test.beforeEach(async ({ page }) => {
            await page.getByText('Datepicker').click()
        })

        test('Date Picker - part 1 - passing hard coded value', async ({ page }) => {

            /**
             * best way to identify date is 1st to identify a unique locator
             * because in a date picker it also contains some dates from previous n next month
             * but the class attribute for them is diff
             * 
             * getByText() - this method looks for partial match
             * so getByText('1') will return 1, 11,12, 13 etc as matches
             * so for exact match we just need getByText('1',{exact: true})
             */

            const calendarInputField = page.getByPlaceholder('Form Picker')
            await calendarInputField.click()
            const allDates = page.locator('[class="day-cell ng-star-inserted"]')
            await allDates.getByText('1', { exact: true }).click()
            await expect(calendarInputField).toHaveValue('Mar 1, 2025')
        })

        test('Date Picker - part 2 - automatic date selection', async ({ page }) => {

            const calendarInputField = page.getByPlaceholder('Form Picker')
            await calendarInputField.click()

            /** 
             * lets imagine if we have to select tomorrow's date or date after 1 week or next month
             * u dont want to manually update d value everytime
             * new Date() -> it is javascript object which can perform diff operations
             */

            const daysToAdd = 100
            let date = new Date()
            date.setDate(date.getDate() + daysToAdd)
            const expectedDate = date.getDate().toString()
            const expectedMonthShot = date.toLocaleString('En-US', { month: 'short' })
            const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
            const expectedYear = date.getFullYear()
            const expectedFullDate = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`

            let currentMonthNYear = await page.locator('.calendar-navigation').textContent()
            const expectedMonthNYear = ` ${expectedMonthLong} ${expectedYear} `

            if (daysToAdd > 0) {
                while (!expectedMonthNYear.includes(currentMonthNYear)) {
                    await page.locator('[data-name="chevron-right"]').click()
                    currentMonthNYear = await page.locator('.calendar-navigation').textContent()
                }
            }
            else {
                while (!expectedMonthNYear.includes(currentMonthNYear)) {
                    await page.locator('nb-calendar-pageable-navigation [data-name="chevron-left"]').click()
                    currentMonthNYear = await page.locator('.calendar-navigation').textContent()
                }
            }


            await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click()
            await expect(calendarInputField).toHaveValue(expectedFullDate)
        })
    })

})

test.describe('modals n overlays', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Modal & Overlays').click()
    })

    test('checkboxes', async ({ page }) => {

        await page.getByText('Toastr').click()
        /**
         * check() method will check d status of d checkbox, if it is already checked, it wont unselect it
         * while click() command is just perfoming the click, it doesnt validate d status of d current statud of d checkbox
         * better to use check() method n if u want to uncheck something use uncheck()
         */

        // await page.getByRole('checkbox', { name: 'Hide on click' }).click()
        await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })
        await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true })

        /**
         * allCheckboxes represent d locator of all checkboxes, this is not a collection of d elements
         * in order to loop through d array, we need to convert them into an array
         * so we need to call allCheckboxes.all() -> this will create an array out of d list of this element n since this is a promise, we need to have await command before it
         * 
         */
        const allCheckboxes = page.getByRole('checkbox')
        for (const checkbox of await allCheckboxes.all()) {

            await checkbox.check({ force: true })
            expect(await checkbox.isChecked()).toBeTruthy()

        }

        for (const checkbox of await allCheckboxes.all()) {
            await checkbox.uncheck({ force: true })
            expect(await checkbox.isChecked()).toBeFalsy()
        }

    })

    test('tooltips', async ({ page }) => {

        await page.getByText('Tooltip').click()

        /**
         * the difficulty with automating this is that it is not visible on d dom
         * here is d trick ->
         * go to d 'Sources' tab
         * Hover d mouse on d element which has a tooltip
         * then press F8 on windows or Command \ on mac -> to freeze d browser
         * now d browser is freeze n in debug mode
         * now go back to 'Elements' n u can find out this tooltip element
         */

        /**
         * we have a getByRole('tooltip')
         * but this only works if u have a role tooltip created, so ur webelement should have a role tooltip 
         * but in ur case, it is not there, so we will use just a regular locator
         */

        const coloredTooltipsDialog = page.locator('nb-card', { hasText: "Colored Tooltips" })
        await coloredTooltipsDialog.getByRole('button', { name: 'DEFAULT' }).click()

        const tooltipText = await page.locator('nb-tooltip').textContent()
        expect(tooltipText).toEqual('This is a tooltip')

    })

    test('web dialog box', async ({ page }) => {
        await page.getByText('Dialog').click()

        /**
         * automating this is straightforward because this is part of d dom
         */

    })

})

test.describe('Tables n Data', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Tables & Data').click()
    })

    test('Smart Table', async ({ page }) => {
        await page.getByText('Smart Table').click()

        /**
         * when we try to delete one row
         * we see a browser type of dialog box which does not belong to a web page
         * it belongs to a browser
         * we cannot click on inspect element, this is a browser message
         * automation of this kind of dialog box is a lil bit trickier
         * 
         * when we try to automate this, we see that playwright automatically cancels d dialog box n when need to overcome this by accepting d dialog box
         * 
         * we will have to create a listener which will listen to a dialog event
         */

        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
        })

        const tableRows = page.getByRole('table').locator('tr')
        await tableRows.filter({ hasText: 'mdo@gmail.com' }).locator('.nb-trash').click()
        await expect(page.locator('tbody tr').first()).not.toHaveText('mdo@gmail.com')

    })

    test('web tables - part 1', async ({ page }) => {

        await page.getByText('Smart Table').click()

        /**
         * automation of web tables can be tricky just because of d structure of d table
         * in dom -> table always starts with a table tag
         * when u open it usually we have thead tag or tbody
         * sometimes without a thead, its a tbody html tag
         * then we have tr's, n each td's which r columns   
         * d tricky part is to select d entire column, because each column exist inside a row
         */

        //get a row by any text in that row
        const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' })
        await targetRow.locator('.nb-edit').click()

        /**
         * now when we edit any row, d dom changes, d email does not exist anymore as text
         * this is a property now, ng-reflect-model
         * we have discussed that inside a input field, d text that u see is not actually html text
         * this is a property value, therefore the locator wont work
         */

        const rowInEdit = page.locator('input-editor')
        await rowInEdit.getByPlaceholder('Age').clear()
        await rowInEdit.getByPlaceholder('Age').fill('37')
        await page.locator('.nb-checkmark').click()

        //get a row based on the value in a specific column when that value can exist at multiple places
        await page.locator('.ng2-smart-page-item').getByText('2').click()
        const targetRowById = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText('11') })
        await targetRowById.locator('.nb-edit').click()
        await rowInEdit.getByPlaceholder('E-mail').clear()
        await rowInEdit.getByPlaceholder('E-mail').fill('test@test.com')
        await page.locator('.nb-checkmark').click()
        await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com')

    })

    test('web tables - part 2 - my approach', async ({ page }) => {

        await page.getByText('Smart Table').click()

        /**
         * in this scenario, we'l see how to loop thru table rows n make validations
         * for example, we have a feature where we can filter out rows with d help of a search box
         * like we can search for people with age = 30 or 20
         * n lets say i have to make a validation, that when i filter age=20
         * i get rows where age = 20
         * n we also validate that if give age=200, then we get message 'no data found'
         */

        const ageToFilter = ['20', '30', '40', '200']

        for (const age of ageToFilter) {
            await page.getByPlaceholder('Age').clear()
            await page.getByPlaceholder('Age').fill(age)
            await page.waitForTimeout(500)

            const count = await page.locator('tbody tr').last().count()
            console.log(count)

            if (count > 0) {
                for (let i = 1; i < count; i++) {
                    const actualAge = await page.locator('tr').nth(i).locator('td').nth(7).textContent()
                    expect(actualAge).toEqual(age)
                }
            }

            else {
                const message = await page.locator('tr').nth(3).textContent()
                expect(message).toEqual('No data foundd')
            }
        }
    })

    test('web tables - part 2 - trainer approach', async ({ page }) => {

        await page.getByText('Smart Table').click()

        /**
         * in this scenario, we'l see how to loop thru table rows n make validations
         * for example, we have a feature where we can filter out rows with d help of a search box
         * like we can search for people with age = 30 or 20
         * n lets say i have to make a validation, that when i filter age=20
         * i get rows where age = 20
         * n we also validate that if give age=200, then we get message 'no data found'
         */

        const ages = ['20', '30', '40', '200']

        for (let age of ages) {
            await page.getByPlaceholder('Age').clear()
            await page.getByPlaceholder('Age').fill(age)
            await page.waitForTimeout(500)

            if (age == '200') {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
                break
            }

            const ageRows = page.locator('tbody tr')
            for (let row of await ageRows.all()) {
                const ageFound = await row.locator('td').last().textContent()
                expect(ageFound).toEqual(age)
            }
        }
    })
})