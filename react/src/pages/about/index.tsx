import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const About = () => {
  const navigate = useNavigate()
  return (
    <div className="page-about-container">
      <h2>about me</h2>
      <Button
        type="primary"
        onClick={() => {
          navigate('/home')
        }}
      >
        回到首页
      </Button>
    </div>
  )
}
export default About
