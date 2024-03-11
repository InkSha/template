import { createSlice } from '@reduxjs/toolkit'
import { config } from '@/config'

const items = localStorage.getItem(config.session_key) ?? '{}'

const sessionStorage = (() => {
  try {
    return JSON.parse(items)
  } catch {
    return {}
  }
})()

const initialState = {
  key: sessionStorage?.key ?? 'key',
}

export const infoSlice = createSlice({
  name: 'main', // store name
  initialState,
  reducers: {
    setKey: (state, action) => {
      state.key = action.payload
      localStorage.setItem(config.session_key, JSON.stringify(state))
    },
  },
})

export const { setKey } = infoSlice.actions

export default infoSlice.reducer
