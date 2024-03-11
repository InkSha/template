import request from '@/utils/request'
import type { info } from '@/types'

export function getInfo () {
  return request<info>({
    url: '/get/info',
    method: 'get',
    params: {}
  })
}
