import { createHashRouter, Navigate } from 'react-router-dom'
import About from '@/pages/about'
import Home from '@/pages/home'
import Other from '@/pages/other'
import Entry from '@/pages/entry'
import { config } from '@/config'

export const globalRoute = createHashRouter([
  {
    path: '/',
    element: <Entry />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
  {
    path: '*',
    element: <Other />,
  },
])

export const PrivateRoute = (props: any) => {
  return localStorage.getItem(config.session_key) ? (
    props.children
  ) : (
    <Navigate to="/other" />
  )
}
