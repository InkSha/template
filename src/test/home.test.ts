describe('example', () => {
  test('hello', async () => {
    const page = await program.currentPage()
    console.log(page)
    expect(await (await page.$('.title')).text()).toBe('hello')
    await (await page.$('.title')).tap()
  })
})
