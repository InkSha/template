import { Outlet, useLocation } from 'react-router-dom'
import Header from '@/components/header'
import { PrivateRoute } from '@/route'
import './entry.scss'

function Entry() {
  const location = useLocation()

  return (
    <PrivateRoute>
      <div className="container">
        <h1>入口</h1>
        <Header />
        <div className="main-header">{location.pathname}</div>
        <div className="main-container">
          <Outlet />
        </div>
      </div>
    </PrivateRoute>
  )
}

export default Entry
