import { createHashHistory } from 'history'
import axios from 'axios'
import { config } from '@/config'

const history = createHashHistory<string>()

// example
export const goto = (path: string) => {
  history.push(path)
}

axios.interceptors.request.use(
  (req) => req,
  (err) => err,
)
axios.interceptors.response.use(
  (res) => res,
  (err) => err,
)

export const getInfo = () => {
  axios.get(config.api_domain + 'info').then((res) => {
    console.log(res)
  })
}
