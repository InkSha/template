import { Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { setKey } from '@/store/slice/info'

const Header = () => {
  // write in store
  const dispatch = useDispatch()
  // read in store
  const info = useSelector((state: { info: { key: string } }) => state.info)

  return (
    <div className="component-header-container">
      <div className="component-head">
        <h1>头部导航</h1>
      </div>
      <div className="component-main">
        <Button
          onClick={() => {
            dispatch(
              setKey(
                new Array(10)
                  .fill('')
                  .map((v) => Math.floor(Math.random() * 36 + 1).toString(36))
                  .join(''),
              ),
            )
          }}
        >
          {info.key ?? 'not text'}
        </Button>
      </div>
    </div>
  )
}

export default Header
