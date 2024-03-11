import Mock from 'mockjs'
import { config } from '@/config'

Mock.mock(config.api_domain + 'info', () => {
  return {
    code: 200,
    message: 'ok',
    data: {
      id: Math.floor(Math.random() * 100) + 1,
    },
  }
})
