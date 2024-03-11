import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice/counter'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
