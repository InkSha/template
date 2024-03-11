import axios from 'axios'

/** api 请求 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REQUEST_BASE_URL,
  timeout: 1000,
  withCredentials: true
})

// 请求拦截
api.interceptors.request.use(
  // 请求成功
  (req) => {
    return req
  },
  // 请求失败
  (err) => {
    console.error(err)
  }
)

// 响应拦截
api.interceptors.response.use(
  // 响应成功
  (res) => {
    return res.data
  },
  // 响应失败
  (err) => {
    console.error(err)
  }
)

export default api
