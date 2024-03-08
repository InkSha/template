import api from './request'

/**
 * 请求计数器
 * @param amount 请求总数
 * @returns 请求数据
 */
export const requestCounter = async (amount: number) =>
  api.get('/counter', { params: { amount } }).then(
    (res) =>
      new Promise<{ data: { amount: number } }>((resolve, reject) => {
        setTimeout(() => {
          resolve({ data: { amount } })
        }, 1000)
      })
  )
