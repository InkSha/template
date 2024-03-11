import { store } from '@/store'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'

const StoreProvider: React.FC<{
  children: ReactNode
}> = ({ children }) => <Provider store={store}>{children}</Provider>

export default StoreProvider
