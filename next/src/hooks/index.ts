import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'

/**
 * 状态调度
 *
 * 二次封装后具备类型提示
 */
export const useAppDispatch: () => AppDispatch = useDispatch

/**
 * 状态选择
 *
 * 二次封装后具备类型提示
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
