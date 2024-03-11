import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState, AppThunk } from '@/store'
import { requestCounter } from '@/api'

/**
 * 当前数据片段名称
 */
export const sliceName = 'counter'

/**
 * 当前片段数据类型
 */
export interface SliceState {
  value: number
  status: 'idle' | 'loading' | 'failed'
}

/**
 * 初始值
 */
const initialState: SliceState = {
  value: 0,
  status: 'idle'
}

/**
 * 异步加法
 */
export const incrementAsync = createAsyncThunk(
  sliceName + '/fetchCount',
  async (amount: number) => {
    const response = await requestCounter(amount)
    return response.data.amount
  }
)

/**
 * 计数器数据片段
 */
export const counterSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    decrement: (state, action: PayloadAction<number>) => {
      if (state.value - action.payload > 0) {
        state.value -= action.payload
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.value += action.payload
        state.status = 'idle'
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export const { increment, decrement } = counterSlice.actions

export const selectCount = (state: RootState) => state.counter.value
export const selectStatus = (state: RootState) => state.counter.status

export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState())
    if (currentValue % 2) {
      dispatch(increment(amount))
    }
  }

export default counterSlice.reducer
