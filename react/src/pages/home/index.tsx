import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { goto } from '@/api'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="page-home-container">
      <h2>home page</h2>
      <Button
        type="link"
        onClick={() => {
          goto('/other')
        }}
      >
        其他页面
      </Button>
      <Button
        type="primary"
        onClick={() => {
          navigate('/about')
        }}
      >
        about
      </Button>
    </div>
  )
}
export default Home
