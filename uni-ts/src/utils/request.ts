import axios from 'axios'
import type { AxiosAdapter } from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
import net from '@/config/net'

axios.defaults.adapter = mpAdapter as AxiosAdapter

const instance = axios.create(net)

// request pre handling
instance.interceptors.request.use(
  (req) => req,
  (err) => err,
)

// response pre handling
instance.interceptors.response.use(
  (res) => res,
  (err) => err,
)

export default instance
