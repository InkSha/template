import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '@/app/page'

describe('测试首页渲染', () => {
  it('渲染 main', () => {
    render(<Page />)
    const main = screen.getByRole('main')
    //   main元素在 文档中
    expect(main).toBeInTheDocument()
  })

  it('测试快照', () => {
    const { container } = render(<Page />)
    expect(container).toMatchSnapshot('home')
  })
})
