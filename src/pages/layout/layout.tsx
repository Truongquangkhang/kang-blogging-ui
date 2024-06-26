import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import Header from '../../components/header'

const LayOut = () => {
  const authStates = useAppSelector((state) => state.auth)
  const userStates = useAppSelector((state) => state.user)
  return (
    <div className="flex-col items-center bg-gray-100">
      <div className="z-50 fixed w-full top-0 left-0 bg-gray-100">
        <Header
          isLogin={authStates.isLogin}
          user={userStates.user}
        />
      </div>
      <div className="mt-20 w-full pl-40 pr-40">
        <Outlet />
      </div>
    </div>
  )
}

export default LayOut
