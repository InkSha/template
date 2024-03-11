import { configureStore } from '@reduxjs/toolkit'
import infoReducer from '@/store/slice/info'

export const store = configureStore({
  reducer: {
    info: infoReducer,
  },
})
