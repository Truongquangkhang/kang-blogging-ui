import { Navigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { logOut } from '../../redux/reducers/auth'
import { removeUser } from '../../redux/reducers/user'

const LogOut = () => {
  const dispatch = useAppDispatch()
  dispatch(logOut())
  dispatch(removeUser())
  return <Navigate to="/" />
}

export default LogOut
