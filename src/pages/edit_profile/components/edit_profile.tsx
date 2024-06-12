import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { useNavigate } from 'react-router-dom'
import ApiUser from '../../../apis/kang-blogging/user'
import { setUser } from '../../../redux/reducers/user'
import { MapErrorResponse } from '../../../utils/map_data_response'
import { setNotify } from '../../../redux/reducers/notify'
import ImageUploader from '../../../components/upload_image'

const EditProfile = () => {
  const userStates = useAppSelector((state) => state.user)
  const authStates = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [avatar, setAvatar] = useState(userStates.user?.avatar ?? '')
  const [name, setName] = useState(userStates.user?.name)
  const [displayName, setDisplayName] = useState(userStates.user?.displayName)
  const [description, setDescription] = useState(userStates.user?.description)

  const handleClickSubmit = () => {
    if (name != null && displayName != null && description != null && avatar != null) {
      ApiUser.updateUser(userStates.user?.id ?? '', authStates.accessToken ?? '', {
        name: name,
        displayName: displayName,
        description: description,
        avatar: avatar,
      })
        .then((rs) => {
          var u = rs.data.data.user
          console.log(u)
          dispatch(setUser(u))
          navigate(`/user/${rs.data.data.user.id}`)
        })
        .catch((err) => {
          console.log(err)
          var e = MapErrorResponse(err)
          dispatch(
            setNotify({
              title: 'occurred an error !!!',
              description: e.message,
              mustShow: true,
            }),
          )
        })
    } else {
      dispatch(setNotify({ title: 'Error', description: 'Invalid data', mustShow: true }))
    }
  }
  return (
    <div className="flex flex-col space-y-10 w-full items-center justify-center">
      <div className="flex-col space-y-3 justify-start w-full rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-lg">
        <label className="text-xl font-bold items-start">User</label>
        <div className="flex-col space-y-5 mt-5">
          <div className="flex-col text-left">
            <label className="text-x font-semibold">Name</label>
            <input
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex-col text-left">
            <label className="text-x font-semibold">Display Name</label>
            <input
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Show name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="flex-col text-left">
            <label className="text-x font-semibold">Description</label>
            <textarea
              value={description ?? ''}
              onChange={(e) => setDescription(e.target.value)}
              id="comment"
              rows={2}
              className="px-2 pt-2 w-full text-left text-x text-gray-700 leading-tight border-r rounded-lg rounded-t-lg border border-gray-200 hover:border-gray-200"
              required></textarea>
          </div>
          <div className="flex-col text-left">
            <ImageUploader
              imageSrc={avatar}
              setImageSrc={setAvatar}
            />
          </div>
        </div>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={() => {
            handleClickSubmit()
          }}
          type="button"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-blue-400   text-white rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-blue-700">
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

export default EditProfile
