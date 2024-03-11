import type { CreateAxiosDefaults } from 'axios'

const net: CreateAxiosDefaults = {
  baseURL: 'http://localhost:5555',
  timeout: 3000,
}

export default net
