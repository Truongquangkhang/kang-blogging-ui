import { useState } from 'react'
import ApiIam from '../../../apis/kang-blogging/iam'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { setNotify } from '../../../redux/reducers/notify'
import { useNavigate } from 'react-router-dom'
import { MapErrorResponse } from '../../../utils/map_data_response'
import { AxiosError } from 'axios'

const EditAccount = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const userStates = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handlerChangePassword = () => {
    if (
      oldPassword != '' &&
      newPassword != '' &&
      repeatPassword != '' &&
      newPassword == repeatPassword
    ) {
      ApiIam.changePassword({
        userId: userStates.user?.id ?? '',
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
        .then(() => {
          navigate(`/user/${userStates.user?.id}`)
        })
        .catch((err) => {
          const e = MapErrorResponse((err as AxiosError).response)
          dispatch(
            setNotify({
              title: 'an error occurred',
              description: e.message,
              mustShow: true,
            }),
          )
        })
    } else {
      dispatch(setNotify({ title: 'Invalid params', description: '', mustShow: true }))
    }
  }

  return (
    <div className="flex flex-col space-y-10 w-full items-center justify-center">
      <div className="flex-col space-y-3 justify-start w-full rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-lg">
        <label className="text-xl font-bold items-start">Account</label>
        <div className="flex-col space-y-5 mt-5 py-5">
          <div className="flex-col text-left">
            <label className="text-x font-semibold">Old Password</label>
            <input
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="password"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value)
              }}
            />
          </div>
          <div className="flex-col text-left">
            <label className="text-x font-semibold">New Password</label>
            <input
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value)
              }}
            />
          </div>
          <div className="flex-col text-left">
            <label className="text-x font-semibold">Repeat Password </label>
            <input
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="password"
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value)
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={() => {
            handlerChangePassword()
          }}
          type="button"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-blue-800   text-white rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-blue-900">
          Submit
        </button>
        <button
          onClick={() => {
            navigate(`/user/${userStates.user?.id}`)
          }}
          type="button"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-gray-400">
          Dismiss
        </button>
      </div>
    </div>
  )
}

export default EditAccount
