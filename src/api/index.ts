import api from './request'

/**
 * 请求示例数据
 * @returns 请求数据
 */
export const requestExampleData = async () => api.get('/connection')
