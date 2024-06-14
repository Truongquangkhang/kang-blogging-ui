import { useState } from 'react'
import ApiIam from '../../../apis/kang-blogging/iam'
import { useAppDispatch } from '../../../hooks'
import { setNotify } from '../../../redux/reducers/notify'
import { MapErrorResponse } from '../../../utils/map_data_response'
import { AxiosError } from 'axios'
import { setAuth } from '../../../redux/reducers/auth'
import { setUser } from '../../../redux/reducers/user'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '../../../components/loading_button/loading_button'

const FormLogin = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const SubmitFormLoginHandler = async () => {
    try {
      const rs = await ApiIam.login({ username, password })

      dispatch(
        setAuth({
          isLogin: true,
          accessToken: rs.data.data.accessToken,
          refreshToken: rs.data.data.refreshToken,
        }),
      )
      dispatch(setUser(rs.data.data.userInfo))
      navigate('/')
    } catch (error) {
      const rs = MapErrorResponse((error as AxiosError).response)
      dispatch(
        setNotify({
          title: rs.message,
          description: '',
          mustShow: true,
        }),
      )
    }
  }

  return (
    <div className="w-full max-w-xs text-left">
      <p className="text-2xl font-bold text-center mb-5">Login</p>
      <form className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          {/* <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={SubmitFormLoginHandler}>
            Sign In
          </button> */}
          <LoadingButton
            onClick={SubmitFormLoginHandler}
            name="Sign In"
          />
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs"></p>
    </div>
  )
}

export default FormLogin
