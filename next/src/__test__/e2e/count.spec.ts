import { test, expect } from '@playwright/test'

test.describe('count', () => {
  test('count increment and decrement', async ({ page }) => {
    const url = 'http://localhost:3000/count'
    await page.goto(url)

    expect(page.url()).toEqual(url)

    const _decrement = page.getByText('decrement')
    const _increment = page.getByText('increment')
    const _add = page.getByText(/^add$/)
    const _async = page.getByText('async')
    const _isOdd = page.getByText(/^add is odd$/)
    let step = 2
    let init = 0

    expect(Number(await page.inputValue('input[type="number"]'))).toEqual(2)
    expect(await (await page.$('div > span'))?.textContent()).toEqual('0')
    expect(await (await page.$('div > span'))?.innerText()).toEqual(`${init}`)

    await _increment.click()
    init += step
    await _increment.click()
    init += step
    expect(await (await page.$('div > span'))?.innerText()).toEqual(`${init}`)

    await _decrement.click()
    init -= step
    expect(await (await page.$('div > span'))?.innerText()).toEqual(`${init}`)

    await _add.click()
    init += step * 2
    expect(await (await page.$('div > span'))?.innerText()).toEqual(`${init}`)

    await _isOdd.click()
    if (init % 2 !== 0) init += step * 2
    expect(await (await page.$('div > span'))?.innerText()).toEqual(`${init}`)

    await _decrement.click()
    init -= step
    expect(await (await page.$('div > span'))?.innerText()).toEqual(`${init}`)

    await _isOdd.click()
    if (init % 2 !== 0) init += step * 2
    expect(await (await page.$('div > span'))?.innerText()).toEqual(`${init}`)

    await _async.click()
    expect(await _async.innerText()).not.toEqual('async')

    init += step * 2
    expect(await (await page.$('div > span'))?.innerText()).toEqual(`${init}`)
  })
})
