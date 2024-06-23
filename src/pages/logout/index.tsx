import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { logOut } from '../../redux/reducers/auth'
import { removeUser } from '../../redux/reducers/user'

const LogOut = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  dispatch(logOut())
  dispatch(removeUser())

  navigate('/login')
}

export default LogOut
