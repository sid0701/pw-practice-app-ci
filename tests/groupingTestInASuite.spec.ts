import { test } from '@playwright/test'

// Now we have 2 test suite, n each have diff context
// we can have diff preconditions for each

test.describe('1st test suite', () => {

    test('1st test', () => {

    })

    test('2nd test', () => {

    })

    test('3rd test', () => {

    })


})

test.describe('2nd test suite', () => {

    test('1st test', () => {

    })

    test('2nd test', () => {

    })

    test('3rd test', () => {

    })


})