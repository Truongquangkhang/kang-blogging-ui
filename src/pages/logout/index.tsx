import { Navigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { logOut } from '../../redux/reducers/auth'

const LogOut = () => {
  const dispatch = useAppDispatch()
  dispatch(logOut())
  return <Navigate to="/" />
}

export default LogOut
