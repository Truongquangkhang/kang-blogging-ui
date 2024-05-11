import { useState } from 'react'
import ApiIam from '../../../apis/kang-blogging/iam'
import { useAppDispatch } from '../../../hooks'
import { setNotify } from '../../../redux/reducers/notify'
import {
  MapAxiosReponseToModelLoginReponse,
  MapErrorResponse,
} from '../../../utils/map_data_response'
import { AxiosError } from 'axios'

const FormLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const SubmitFormLoginHandler = async () => {
    try {
      const data = await ApiIam.login({ username, password })
      const rs = MapAxiosReponseToModelLoginReponse(data)
      console.log(rs)
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
    <div className="w-full max-w-xs">
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
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={SubmitFormLoginHandler}>
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#">
            Forgot Password?
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  )
}

export default FormLogin
